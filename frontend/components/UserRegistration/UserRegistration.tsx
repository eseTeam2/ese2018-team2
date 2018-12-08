import * as React from "react";
import { SingletonRouter, withRouter } from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import UserRegistrationComponent from "./UserRegistrationComponent";

interface UserRegistrationProps {
  router?: SingletonRouter;
}

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $phone: String
    $studyProgram: String!
    $university: String!
  ) {
    createUser(
      input: {
        email: $email
        password: $password
        firstname: $firstname
        lastname: $lastname
        phone: $phone
        studyProgram: $studyProgram
        university: $university
      }
    ) {
      confirmed
    }
  }
`;

class UserRegistration extends React.Component<UserRegistrationProps> {
  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createStudent, { loading }) => {
          return (
            <UserRegistrationComponent
              loading={loading}
              onCreate={async data => {
                await createStudent({
                  variables: {
                    email: data.email,
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    phone: data.phone,
                    studyProgram: data.studyProgram,
                    university: data.university
                  }
                });
                await this.props.router.replace("/");
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(UserRegistration);
