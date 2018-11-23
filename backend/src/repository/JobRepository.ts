import { JobConnection } from "src/types";
import { Connection, Repository } from "typeorm";
import { Job } from "../entity/Job";
import { Organization } from "../entity/Organization";

export interface JobUpdateArgs {
  id: string;
  title: string;
  description: string;
}

interface CursorOpts {
  seq: number;
  count: number;
}

const encodeCursor = (options: CursorOpts) =>
  Buffer.from(JSON.stringify(options)).toString("base64");
const decodeCursor = (src: string) =>
  JSON.parse(Buffer.from(src, "base64").toString()) as CursorOpts;

export class JobRepository {
  private connection: Connection;
  private jobs: Repository<Job>;
  private organizations: Repository<Organization>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.jobs = connection.getRepository(Job);
    this.organizations = connection.getRepository(Organization);
  }

  // TODO create interface for argument type
  async getJobs(
    first: number,
    last: number,
    after: string,
    before: string
  ): Promise<JobConnection> {
    const defaultLimit = 10;
    const limit = first ? first : last ? last : defaultLimit;

    const { seq = 0, count = 0 } = after
      ? decodeCursor(after)
      : before
        ? decodeCursor(before)
        : {};

    console.log(`count: ${count}`);

    const totalCount = await this.jobs.count();

    const nodes = await this.jobs
      .createQueryBuilder("job")
      .limit(limit)
      .addOrderBy("job.sequenceNumber")
      .where("job.sequenceNumber >= :seq", { seq })
      .getMany();

    const hasNextPage = totalCount > count + nodes.length;
    const hasPreviousPage = count - nodes.length >= 0;

    let beforeSeq = 0;

    if (hasPreviousPage) {
      const r = await this.jobs
        .createQueryBuilder("job")
        .offset(limit - 1)
        .addOrderBy("job.sequenceNumber", "DESC")
        .where("job.sequenceNumber < :seq", { seq: nodes[0].sequenceNumber })
        .getMany();

      beforeSeq = r[0].sequenceNumber;
    }

    let nextSeq = 1;

    if (hasNextPage) {
      const r = await this.jobs
        .createQueryBuilder("job")
        .limit(1)
        .offset(limit - 1)
        .addOrderBy("job.sequenceNumber", "ASC")
        .where("job.sequenceNumber > :seq", {
          seq: nodes[nodes.length - 1].sequenceNumber
        })
        .getMany();

      nextSeq = r[0].sequenceNumber;
    }

    return {
      nodes,
      pageInfo: {
        endCursor: hasNextPage
          ? encodeCursor({
              seq: nextSeq,
              count: count + nodes.length
            })
          : null,
        hasNextPage,
        hasPreviousPage,
        startCursor: hasPreviousPage
          ? encodeCursor({
              seq: beforeSeq,
              count: count - limit
            })
          : null
      },
      totalCount
    };
  }

  async createJob(args: any): Promise<Job> {
    const job = new Job();
    job.title = args.input.title;
    job.description = args.input.description;
    job.salary = 1.0;
    job.start = new Date();

    const organization = await this.organizations.findOneOrFail(
      args.input.organization
    );
    job.organization = organization;
    // save
    await this.jobs.insert(job);
    return job;
  }

  async deleteJob(id: string) {
    await this.jobs.delete(id);
    return true;
  }

  async updateJob(args: JobUpdateArgs): Promise<Job> {
    const id = Object.entries(args)
      .filter(e => e[0] === "userId")
      .map(e => e[1])[0];

    const fieldsToUpdate = Object.entries(args)
      .filter(e => e[0] !== "id")
      .reduce(
        (prev, curr) => Object.assign({}, prev, { [curr[0]]: curr[1] }),
        {}
      );

    await this.jobs.update({ id }, fieldsToUpdate);

    return this.jobs.findOneOrFail(id);
  }
}

export default JobRepository;
