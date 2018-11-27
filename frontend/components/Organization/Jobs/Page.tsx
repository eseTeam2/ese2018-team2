import React from "react";
import { Container, Header } from "semantic-ui-react";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <Header as={"h2"}>Übersicht Jobinserate</Header>
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
