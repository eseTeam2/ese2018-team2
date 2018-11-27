import * as React from "react";
import { Container, Header, Segment, Search } from "semantic-ui-react";

export default () => (
  <Container>
    <Segment basic>
      <Header as="h2">Suche nach einem Job</Header>
      <Search noResultsMessage={"Keine Jobs gefunden"} />
    </Segment>
  </Container>
);
