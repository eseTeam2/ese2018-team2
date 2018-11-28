import { QueryResolvers } from "../../__generated__/graphqlgen";

const resolver: QueryResolvers.OrganizationsResolver = (_, { organizationId }, ctx) => (
  ctx.organizationRepository.getOrganizations(ctx.session, organizationId)
);

export default resolver;
