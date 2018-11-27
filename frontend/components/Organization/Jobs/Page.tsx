import React from "react";
import NavBar from "../../Frame/NavBar";
import { Segment, Container, Header } from "semantic-ui-react";
import { withIntialMe } from "../../../lib/withMe";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Segment basic>
      <Container>
        <Header as={"h2"}>XXX</Header>
      </Container>
    </Segment>
  </React.Fragment>
);

export default withIntialMe(Page);
