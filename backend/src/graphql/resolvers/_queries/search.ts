import { Resolvers, QueryResolvers } from "src/graphql/__generated__/graphqlgen";
import { SearchConnection } from "src/types";

const search: QueryResolvers.SearchResolver = (_, { maxSalary, minSalary }, ctx) => (
  ctx.jobRepository.search(minSalary, maxSalary)
)

export default search;