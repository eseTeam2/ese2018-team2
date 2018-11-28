import bcrypt from "bcryptjs";
import { Connection, FindManyOptions, getConnection, Repository } from "typeorm";
import { Job } from "../entity/Job";
import { User } from "../entity/User";
import enforceAuth, { enforceAdmin, isAdmin } from "./Utils";

export interface FindUserOptions {
  onlyAdmins?: boolean;
  id?: string;
}

export class UserRepository {
  private users: Repository<User>;
  private jobs: Repository<Job>;

  constructor(connection: Connection) {
    this.users = connection.getRepository(User);
    this.jobs = connection.getRepository(Job);
  }

  async login(email: string, password: string, session: Express.Session) {
    const foundUsers = await this.users
      .createQueryBuilder("users")
      .orWhere("users.email = :email", { email })
      .orWhere("users.username = :username", { username: email })
      .getMany();

    if (foundUsers.length === 0) {
      return false;
    }

    const user = foundUsers[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return false;
    }

    const result = (await this.users.findByIds([user.id]))[0];

    session.user = result;

    return true;
  }

  async hasUserOrganization(id: string, session: Express.Session) {
    enforceAuth(session);

    const user = await this.users.findByIds([id], { relations: ["employer"] });
    if (user.length === 0) {
      throw new Error(`No user found for id: ${id}`);
    }

    // if user is admin, he can see hasOrganization
    if (!isAdmin(session)) {
      if (user[0].id !== id) {
        throw new Error("No permission");
      }
    }

    return user[0].employer.length > 0;
  }

  async findUsers(
    { onlyAdmins, id }: FindUserOptions,
    session: Express.Session
  ) {
    enforceAdmin(session);

    // search by id
    if (id) {
      return this.users.find({ id });
    }

    // TODO won't work for more where
    const whereOnlyAdmins = (
      obj: FindManyOptions<User>,
      siteAdmin?: boolean
    ): FindManyOptions<User> =>
      siteAdmin ? { ...obj, where: { siteAdmin: true } } : obj;

    // create sort in where
    const order = (obj: FindManyOptions<User>): FindManyOptions<User> => ({
      ...obj,
      order: { sequenceNumber: "ASC" }
    });

    return this.users.find(whereOnlyAdmins(order({}), onlyAdmins));
  }

  async getMe(session: Express.Session) {
    enforceAuth(session);
    return this.users.findOneOrFail(session.user.id);
  }

  async addBookmark(jobId: string, session: Express.Session): Promise<any> {
    enforceAuth(session);

    await getConnection()
      .createQueryBuilder()
      .relation(User, "bookmarkedJobs")
      .of(session.user.id)
      .add(jobId);

    return true;
  }

  async removeBookmark(jobId: string, session: Express.Session): Promise<any> {
    enforceAuth(session);

    await getConnection()
      .createQueryBuilder()
      .relation(User, "bookmarkedJobs")
      .of(session.user.id)
      .remove(jobId);

    return true;
  }
}
