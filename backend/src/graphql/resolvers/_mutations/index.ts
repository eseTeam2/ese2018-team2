import {MutationResolvers} from "../../__generated__/graphqlgen";
import createJob from "./createJob";
import createOrganization from "./createOrganization";
import deleteJob from "./deleteJob";
import login from "./login";
import logout from "./logout";
import updateJob from "./updateJob";
import addBookmark from "./addBookmark";
import removeBookmark from "./removeBookmark";
import applyForJob from "./applyForJob";
import approveJobApplication from "./approveJobApplication";
import rejectJobApplication from "./rejectJobApplication";
import createRole from "./createRole";
import approveOrganization from "./approveOrganization";

export const Mutation: MutationResolvers.Type = {
    createJob,
    updateJob,
    deleteJob,
    createOrganization,
    approveOrganization,
    createRole,
    login,
    logout,
    addBookmark,
    removeBookmark,
    applyForJob,
    approveJobApplication,
    rejectJobApplication
};

export default Mutation;
