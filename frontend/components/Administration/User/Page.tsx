import React from "react";
import { Container, Header } from "semantic-ui-react";
import EnsureAdmin from "../../../lib/EnsureAdmin";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <EnsureAdmin>
        <Header as={"h2"}>Verwalten der Benutzenden</Header>
      </EnsureAdmin>
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
