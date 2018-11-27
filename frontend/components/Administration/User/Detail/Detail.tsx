import React from "react";
import { Container, Segment } from "semantic-ui-react";
import UserBreadcrumb from "../UserBreadcrumb";
import UserDetail from "./UserDetail";

const DetailComponent = () => (
  <React.Fragment>
    <UserBreadcrumb />
    <Segment basic>
      <Container>
        <p>TODO: Implement UPDATE and DELETE for user</p>
        <UserDetail />
      </Container>
    </Segment>
  </React.Fragment>
);

export default DetailComponent;
