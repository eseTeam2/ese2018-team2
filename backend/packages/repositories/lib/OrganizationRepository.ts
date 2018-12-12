import { Connection, Repository } from "typeorm";
import { Job, Page, StudyProgram } from "@unijobs/backend-modules-models";
import { Organization } from "@unijobs/backend-modules-models";
import { User } from "@unijobs/backend-modules-models";
import enforceAuth, { enforceAdmin, getUserId, isAdmin } from "./Utils";

export class OrganizationRepository {
  private connection: Connection;
  private organizations: Repository<Organization>;
  private users: Repository<User>;
  private jobs: Repository<Job>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.organizations = connection.getRepository(Organization);
    this.users = connection.getRepository(User);
    this.jobs = connection.getRepository(Job);
  }

  async getOrganizations(
    session: Express.Session,
    organizationId?: string
  ): Promise<Organization[]> {
    enforceAuth(session);
    if (isAdmin(session)) {
      if (organizationId) {
        return this.organizations.findByIds([organizationId]);
      }
      return this.organizations.find();
    }

    //TODO check if id is an organization of the current user (organizational user)
    //TODO if user is not a organization user, then do not load!!!
    return (await this.users.findByIds([getUserId(session)], {
      relations: ["employer"]
    }))[0].employer;
  }

  async createOrganization(name: string): Promise<Organization> {
    const organization = new Organization();
    organization.name = name;
    await this.organizations.insert(organization);
    return organization;
  }

  async approveOrganization(
    organizationId: string,
    session: Express.Session
  ): Promise<any> {
    enforceAdmin(session);

    await this.organizations.update({ id: organizationId }, { approved: true });
    return true;
  }

  async deleteOrganization(organizationId: string) {
    await this.jobs.delete({ organization: { id: organizationId } });
    await this.organizations.delete({ id: organizationId });
    return true;
  }

  async getPages(organizationId: string) {
    const results = await this.organizations.find({
      where: {
        id: organizationId
      },
      relations: ["pages"]
    });

    if (results.length < 0) {
      console.log("No organization found");
      //TODO better handling
      throw new Error("Permission denied");
    }

    return results[0].pages;
  }

  async createPage(
    organizationId: string,
    studyPrograms: string[],
    session: Express.Session
  ) {
    enforceAuth(session);
    // TODO Check user priviliges

    const p = new Page();
    p.organization = await this.organizations.findOne(organizationId);
    p.studyProgramms = await this.connection
      .getRepository(StudyProgram)
      .findByIds(studyPrograms);

    const result = await this.connection.getRepository(StudyProgram).save(p);
    return await this.connection
      .getRepository(StudyProgram)
      .findOne(result.id, { relations: ["studyPrograms"] });
  }
}
