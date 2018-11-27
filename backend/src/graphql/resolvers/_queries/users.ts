import { QueryResolvers } from "src/graphql/__generated__/graphqlgen";

const users: QueryResolvers.UsersResolver = (
  _,
  args,
  { session, userRepository }
) => userRepository.findUsers({ onlyAdmins: args.onlyAdmins }, session);

export default users;
