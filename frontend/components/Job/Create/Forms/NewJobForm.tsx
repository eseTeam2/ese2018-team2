import { Button, Form, Grid, Header, Loader, Segment } from "semantic-ui-react";
import OrganizationSelect from "../../../Organization/OrganizationSelect";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import * as React from "react";
import { GET_ALL_ORGANIZATION_JOBS } from "../../../Organization/Jobs/OrganisationOverview";
import Link from "next/link";
import ScheduleTabs from "./ScheduleTabs";
import { toast } from "react-toastify";
import { ApolloError } from "apollo-client";
import ReactDatePicker from "react-datepicker";

interface NewJobFormComponentProps {
  loading: boolean;
  error: ApolloError;
  onCreate: (
    formData: { title: string; description: string; organization: string }
  ) => void;
}

interface NewJobFormComponentState {
  title: string;
  description: string;
  organization: any;
  salary: number;
  perHour: boolean;
  jobSchedule: JobSchedule;
  disableButton: boolean;
  scheduleTabs: any;
}

export enum JobScheduleType {
  "fixed",
  "temporary",
  "oneTime",
  "EMPTY"
}

export interface JobSchedule {
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
    jobSchedule: {
      schedule: JobScheduleType.EMPTY,
      start: new Date(),
      workload: 0
    },
    disableButton: false,
    scheduleTabs: <Loader />
  };

  /**
   * Because the parent component is rendered on the server side, and Schedule Tabs
   * needs the window component, it has to be rendered in a second step
   */
  componentDidMount(): void {
    this.setState({
      scheduleTabs: <ScheduleTabs handleChange={this.handleChange} />
    });
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value });
    console.log(name + " : " + value);
  };

  handleSubmit = e => {
    this.props.onCreate(this.state);
    this.setState({ disableButton: true });
    this.props.error &&
      !this.props.loading &&
      toast.error("Ein Fehler ist aufgetreten");
    !this.props.error &&
      !this.props.loading &&
      toast.success("Jobinserat wurde zur Validierung versandt. ");
    e.preventDefault();
  };

  render() {
    return (
      <Segment.Group>
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
              {/*Client side rendering of schedule Tabs*/}
              {this.state.scheduleTabs}
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
            {!this.state.disableButton && (
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
            {this.state.disableButton && (
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

const NewJobForm: React.FC = () => (
  <React.Fragment>
    <Mutation
      mutation={CREATE_NEW_JOB}
      refetchQueries={[{ query: GET_ALL_ORGANIZATION_JOBS }]}
      awaitRefetchQueries
    >
      {(createJob, { loading, error }) => (
        <NewJobFormComponent
          loading={loading}
          error={error}
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
