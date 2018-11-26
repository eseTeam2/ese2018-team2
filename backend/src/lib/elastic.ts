import { Client } from "elasticsearch";
import { Connection } from "typeorm";
import config from "../config";
import { Job } from "../entity/Job";

export const elasticClient = new Client({
  host: config.get("elasticsearch_url"),
  log: "trace"
});

export const uploadJobs = async (connection: Connection, jobs: Array<Job>) => {
  const indexExists = await elasticClient.indices.exists({
    index: "jobs"
  });

  console.log(`indexExists: ${indexExists}`);

  if (indexExists) {
    await elasticClient.indices.delete({
      index: "jobs"
    });
  }

  await elasticClient.indices.create({
    index: "jobs",
    body: {
      mappings: {
        Job: {
          properties: {
            title: { type: "text" },
            roles: { type: "long" },
            salary: { type: "double" },
            sequenceNumber: { type: "long" }
          }
        }
      }
    }
  });

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    console.log(job);

    await elasticClient.create({
      index: "jobs",
      id: job.id,
      type: "Job",
      body: {
        title: job.title,
        salary: job.salary,
        roles: job.roles.map((e) => e.sequenceNumber),
        sequenceNumber: job.sequenceNumber
      }
    });
  }

  /*const result = await elasticClient.search({
    index: "jobs",
    body: {
      query: {
        range: {
          salary: {
            gte: 0,
            lte: 2
          }
        }
      },
      aggs: {
        Job: {
          terms: {
            field: "roles"
          }
        }
      }
    }
  });

  const roles = (await connection.getRepository(Role).find()).map((e) => ({id: e.sequenceNumber, title: e.title}))

  console.log(result.aggregations.Job.buckets);
  console.log(roles);*/

};
