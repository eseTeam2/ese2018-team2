import React from "react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../components/Frame/NavBar";
import { withIntialMe } from "../lib/withMe";
import { Container, Header } from "semantic-ui-react";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <Header as={"h2"}>Profil</Header>
      <p>TODO</p>
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
