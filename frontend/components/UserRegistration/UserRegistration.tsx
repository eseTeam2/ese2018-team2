import * as React from "react";
import { Header, Segment } from "semantic-ui-react";

const UserRegistration: React.FC = () => {
  return (
    <React.Fragment>
      <Header as={"h1"} attached="top">
        Register
      </Header>
      <Segment attached="bottom" />
    </React.Fragment>
  );
};

export default UserRegistration;
