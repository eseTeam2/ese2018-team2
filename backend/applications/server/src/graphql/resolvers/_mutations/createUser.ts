import { MutationResolvers } from "../../__generated__/graphqlgen";

const createUser: MutationResolvers.CreateUserResolver = (_, args, ctx) => {
  return ctx.userRepository.createUser(args);
};

export default createUser;
