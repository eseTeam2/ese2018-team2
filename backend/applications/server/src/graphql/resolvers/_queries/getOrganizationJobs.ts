import { QueryResolvers } from "../../__generated__/graphqlgen";

const getOrganizationJobs: QueryResolvers.GetOrganizationJobsResolver = (_, args, ctx) =>
    ctx.jobRepository.getOrganizationJobs(args.organizationId, ctx.session);

export default getOrganizationJobs;
