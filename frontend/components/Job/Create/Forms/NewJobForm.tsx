import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import OrganizationSelect from "../../../Organization/OrganizationSelect";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import * as React from "react";
import { GET_ALL_ORGANIZATION_JOBS } from "../../../Organization/Jobs/OrganisationOverview";
import Link from "next/link";
import ScheduleTabs from "./ScheduleTabs";

const SuccessMessage = (
  <Segment>
    <Message attached>
      <Message.Header>Jobinserat wurde erfolgreich gespeichert</Message.Header>
      <p>
        Vor der definitiven Veröffendlichung müssen admins das inserat
        validieren. Wir bitten Sie um 1-2 Arbeitstage Geduld.
      </p>
    </Message>
  </Segment>
);

interface NewJobFormComponentProps {
  loading: boolean;
  onCreate: (
    formData: { title: string; description: string; organization: string }
  ) => void;
}

interface NewJobFormComponentState {
  showMessage: boolean;
  title: string;
  description: string;
  organization: any;
  salary: number;
  perHour: boolean;
  jobSchedule: JobSchedule;
}

enum JobScheduleType {
  "fixed",
  "temporary",
  "oneTime",
  "EMPTY"
}

interface JobSchedule {
  schedule: JobScheduleType;
  start: Date;
  end?: Date;
  workload: number;
}

const uniOptions = [
  { key: "uniBern", value: "UniBern", text: "Universität Bern" }
];
const studyProgOptions = [
  { key: "informatik", value: "informaitk", text: "Informatik" }
];

class NewJobFormComponent extends React.Component<
  NewJobFormComponentProps,
  NewJobFormComponentState
> {
  state = {
    title: "",
    description: "",
    organization: "",
    salary: 0,
    perHour: false,
    showMessage: false,
    jobSchedule: {
      schedule: JobScheduleType.EMPTY,
      start: new Date(),
      workload: 0
    }
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log(name + " : " + value);
  };

  handleSubmit = e => {
    this.props.onCreate(this.state);
    this.setState({ showMessage: true });
    e.preventDefault();
  };

  render() {
    return (
      <Segment.Group basic>
        {this.state.showMessage && SuccessMessage}
        <Segment clearing>
          <Form>
            <Segment>
              <Header>Grundinformationen</Header>
              <Form.Input
                name={"title"}
                label="Job Titel"
                placeholder="Job Titel"
                onChange={this.handleChange}
                width={6}
              />
              <Form.Field name={"organization"} width={6}>
                <label>Arbeitgeber</label>
                <OrganizationSelect handleChange={this.handleChange} />
              </Form.Field>
              <Form.TextArea
                name={"description"}
                label="Beschreibung"
                placeholder="Stelle dein Jobangebot kurz vor"
                onChange={this.handleChange}
              />
            </Segment>
            <Segment>
              <Header>Lohn</Header>
              <Grid columns={2}>
                <Grid.Column>
                  <Form.Group inline>
                    <Form.Input
                      name={"salary"}
                      placeholder=" 0.00 CHF"
                      onChange={this.handleChange}
                      width={4}
                    />
                    <Form.Checkbox
                      name={"perHour"}
                      label="Stundenlohn"
                      checked={this.state.perHour}
                      onChange={() =>
                        this.setState({ perHour: !this.state.perHour })
                      }
                    />
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Header>
                    {this.state.salary + " CHF"}
                    {this.state.perHour && "/Stunde"}
                  </Header>
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment>
              <Header>Planung</Header>
              <p>Welche art von Anstellung möchten sie Anbieten?</p>
              <ScheduleTabs handleChange={this.handleChange} />
            </Segment>
            <Segment>
              <Header>Studenten Profil</Header>
              <p>Welche Universitäten möcheten Sie Hauptsächlich ansprechen?</p>
              <Form.Dropdown
                width={5}
                placeholder="Universität"
                fluid
                multiple
                search
                selection
                options={uniOptions}
              />

              <p>Was für Studiengänge möchten sie Ansprechen?</p>
              <Form.Dropdown
                width={10}
                placeholder="Studiengang"
                fluid
                multiple
                search
                selection
                options={studyProgOptions}
              />
            </Segment>
            {!this.state.showMessage && (
              <Button
                size={"big"}
                type={"Submit"}
                labelPosition={"right"}
                icon={"right arrow"}
                color={"green"}
                floated={"right"}
                content={"Veröffendlichen"}
                onClick={this.handleSubmit}
              />
            )}
            {this.state.showMessage && (
              <Link href={"/org/jobs"}>
                <Button
                  size={"big"}
                  as={"a"}
                  labelPosition={"right"}
                  icon={"right arrow"}
                  color={"green"}
                  floated={"right"}
                  content={"Zurück zur Übersicht"}
                />
              </Link>
            )}
          </Form>
        </Segment>
      </Segment.Group>
    );
  }
}

const CREATE_NEW_JOB = gql`
  mutation CREATE_JOB($title: String!, $description: String, $org: ID!) {
    createJob(
      input: { title: $title, description: $description, organization: $org }
    ) {
      id
      title
      description
    }
  }
`;

const NewJobForm: React.SFC<> = () => (
  <React.Fragment>
    <Mutation
      mutation={CREATE_NEW_JOB}
      refetchQueries={[{ query: GET_ALL_ORGANIZATION_JOBS }]}
      awaitRefetchQueries
    >
      {(createJob, { loading }) => (
        <NewJobFormComponent
          loading={loading}
          onCreate={async data => {
            await createJob({
              variables: {
                title: data.title,
                description: data.description,
                org: data.organization
              }
            });
          }}
        />
      )}
    </Mutation>
  </React.Fragment>
);

export default NewJobForm;
