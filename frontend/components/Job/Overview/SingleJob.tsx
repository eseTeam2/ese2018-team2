import React from "react";
import {
  Button,
  Header,
  List,
  Icon,
  Message,
  Segment,
  Loader,
  Grid
} from "semantic-ui-react";
import { withMe, WithMeProps } from "../../../lib/withMe";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { GET_ALL_USER_APPLICATIONS } from "../../Applications/ApplicationList";
import { toast } from "react-toastify";

interface Job {
  id: string;
  description: string;
  title: string;
  organization: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  salary: number;
  isSalaryPerHour: boolean;
  workload: number;
  start: Date;
  end?: Date;
}

interface ApplyButtonComponentProps {
  id?: string;
}

interface ApplyButtonComponentState {
  finished: boolean;
  applied: boolean;
}

const apply_mutation = gql`
  mutation apply($id: String!) {
    applyForJob(jobId: $id)
  }
`;

class ApplyButtonComponent extends React.Component<
  ApplyButtonComponentProps,
  ApplyButtonComponentState
> {
  state = {
    applied: false
  };

  render() {
    return (
      <React.Fragment>
        <Mutation
          mutation={apply_mutation}
          variables={{ id: this.props.id }}
          refetchQueries={() => [{ query: GET_ALL_USER_APPLICATIONS }]}
          awaitRefetchQueries
        >
          {(mutation, { loading }) => (
            <Button
              floated="right"
              size="huge"
              icon
              labelPosition="right"
              disabled={this.state.applied}
              color={"green"}
              onClick={async () => {
                const result = await mutation({
                  variables: { id: this.props.id }
                });
                if (result) {
                  this.setState({ applied: true });
                  toast.success("Für job beworben");
                }
              }}
            >
              <Icon name="arrow right" />
              {loading && <Loader size={"small"} active={loading} />}
              {!loading && "Bewerben"}
            </Button>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

interface ApplyButtonProps extends WithMeProps {
  id?: string;
}

const ApplyButton: React.SFC<ApplyButtonProps> = withMe(({ me, id }) => (
  <React.Fragment>{me && <ApplyButtonComponent id={id} />}</React.Fragment>
));

interface SingleJobComponentProps {
  job?: Job;
}

const SingleJobComponent: React.SFC<SingleJobComponentProps> = ({ job }) => (
  <React.Fragment>
    {!job && <Message error content={"Kein Job gefunden."} />}
    {job && (
      <React.Fragment>
        <Header attached={"top"} as={"h2"}>
          {job.title}
        </Header>
        <Segment attached={"bottom"}>
          <Segment basic clearing>
            <Grid divided>
              <Grid.Column width={10}>
                <Header as={"h4"}>Beschreibung</Header>
                <p>{job.description}</p>
                <Header as={"h4"}>Pensum</Header>
                <List>
                  <List.Item
                    icon={"time"}
                    content={
                      "Arbeitstunden pro Woche: " + job.workload + " Stunden"
                    }
                  />
                </List>
                <Header as={"h4"}>Anforderungen</Header>
                <ul>
                  <li>React kenntnisse</li>
                  <li>HTML, CSS</li>
                  <li>JavaScript, TypeScript</li>
                </ul>
              </Grid.Column>
              <Grid.Column width={6}>
                <Grid.Row>
                  <Header as={"h3"}>{job.organization.name}</Header>
                  <List>
                    <List.Item>
                      <List.Icon name="mail" />
                      <List.Content>
                        <a href={`mailto:${job.organization.email}`}>
                          {job.organization.email}
                        </a>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="phone" />
                      <List.Content>{job.organization.phone}</List.Content>
                    </List.Item>
                  </List>
                </Grid.Row>
              </Grid.Column>
            </Grid>
            <ApplyButton id={job && job.id} />
          </Segment>
        </Segment>
      </React.Fragment>
    )}
  </React.Fragment>
);

export default SingleJobComponent;
