import React from "react";
import { Container, Segment } from "semantic-ui-react";
import OrganizationBreadcrumb from "./OrganizationBreadcrumb";

const DetailComponent = () => (
  <React.Fragment>
    <OrganizationBreadcrumb />
    <Segment basic>
      <Container>
        <p>TODO: Implement UPDATE and DELETE for user</p>
      </Container>
    </Segment>
  </React.Fragment>
);

export default DetailComponent;
