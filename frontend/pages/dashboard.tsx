import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Header } from "semantic-ui-react";
import withAuthorization from "../components/Auth/withAuthorization";
import Me from "../components/Auth/Me";
import ApplicationList from "../components/Applications/ApplicationList";
import NavBar from "../components/Frame/NavBar";

const page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <Header as={"h1"}>Dashboard</Header>
      <Me />
      <ApplicationList />
    </Container>
  </React.Fragment>
);

export default withAuthorization(page);
