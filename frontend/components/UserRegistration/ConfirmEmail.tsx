import * as React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment
} from "semantic-ui-react";
import { SingletonRouter, withRouter } from "next/router";

interface ConfirmEmailProps {
  id: string;
  router?: SingletonRouter;
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ id, router }) => {
  return (
    <Container>
      <Header as={"h1"} attached>
        One last Step!
      </Header>
      <Segment attached="bottom">
        <Grid columns={3}>
          <Grid.Column />
          <Grid.Column>
            <Button
              size="massive"
              icon="arrow right"
              labelPosition="right"
              color="green"
              content="Confirm your email"
              onClick={async e => {
                e.preventDefault();
                await router.push("/");
              }}
            />
          </Grid.Column>
          <Grid.Column />
        </Grid>
      </Segment>
    </Container>
  );
};

export default withRouter(ConfirmEmail);
