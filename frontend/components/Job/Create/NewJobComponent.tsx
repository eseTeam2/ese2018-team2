import * as React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import JobEditor from "./JobEditor";
import NewJobForm from "./Forms/NewJobForm";

interface NewJobComponentProps {}

interface NewJobComponentState {}

class NewJobComponent extends React.Component<
  NewJobComponentProps,
  NewJobComponentState
> {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment clearing>
            <Header as={"h1"}>Erstelle dein Jobinserat</Header>
            <NewJobForm />
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default NewJobComponent;
