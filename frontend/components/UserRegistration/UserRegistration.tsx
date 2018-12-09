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
      email
      id
    }
  }
`;

class UserRegistration extends React.Component<UserRegistrationProps> {
  state = {
    email: "",
    id: ""
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_USER}
        ignoreResults={false}
        onCompleted={data =>
          alert("localhost:3000/register?id=" + data.createUser.id)
        }
      >
        {(createStudent, { loading }) => {
          return (
            <UserRegistrationComponent
              loading={loading}
              onCreate={async formData => {
                await createStudent({
                  variables: {
                    email: formData.email,
                    password: formData.password,
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    phone: formData.phone,
                    studyProgram: formData.studyProgram,
                    university: formData.university
                  }
                });
                //await this.props.router.replace("/");
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(UserRegistration);
