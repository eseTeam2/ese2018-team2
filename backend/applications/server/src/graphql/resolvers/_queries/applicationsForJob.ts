import { QueryResolvers } from "../../__generated__/graphqlgen";

const applicationsForJob: QueryResolvers.ApplicationsForJobResolver = (_, args, ctx) => {
    return ctx.applicationRepository.getApplicationsForJob(args.jobId, ctx.session);
};

export default applicationsForJob;
