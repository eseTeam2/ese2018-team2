import {Button, Dropdown, Form, Header, Segment} from "semantic-ui-react";
import * as React from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {SingletonRouter, withRouter} from "next/router";
import {GET_ALL_JOBS} from "../../../pages/jobs";
import OrganizationSelect from "../../Organization/OrganizationSelect";


const skillOptions = [
    {
        key: 1,
        text: 'JavaScript',
        value: 1,
        content: <Header icon='code' content='JavaScript' subheader='Stube Sitze'/>,
    },
    {
        key: 2,
        text: 'Go',
        value: 2,
        content: <Header icon='code' content='Go' subheader='The size in the middle'/>,
    },
    {
        key: 3,
        text: 'HTML',
        value: 3,
        content: <Header icon='code' content='HTML' subheader='The largest size'/>,
    },
    {
        key: 4,
        text: 'CSS',
        value: 4,
        content: <Header icon='code' content='CSS' subheader='The largest size'/>,
    },
    {
        key: 5,
        text: 'Microsoft Office',
        value: 5,
        content: <Header icon='desktop' content='Microsoft Office' subheader='The largest size'/>,
    },
];

interface CreateEditorComponentProps {
    onCreate: (
        formData: { title: string; description: string; organization: string }
    ) => void;
    loading: boolean;

}

class CreateEditorComponent extends React.Component<CreateEditorComponentProps> {
    state = {
        title: "",
        description: "",
        skills: [],
        organization: ""
    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
    };

    handleSubmit = e => {
        this.props.onCreate(this.state);
        e.preventDefault();
    };

    render() {

        return (
            <Segment>
                <Header as={"h1"}>Create your Job offer</Header>
                <Form onSubmit={this.handleSubmit} loading={this.props.loading}>
                    <Segment vertical>
                        <Header as={"h3"}>Job Title</Header>
                        <Form.TextArea
                            name={"title"}
                            rows={1}
                            placeholder='Try adding multiple lines'
                            onChange={this.handleChange}
                        />
                    </Segment>
                    <Segment vertical>
                        <Header as={"h3"}>Organization</Header>
                        <Form.Field name={"organization"}>
                            <OrganizationSelect handleChange={this.handleChange}/>
                        </Form.Field>
                    </Segment>
                    <Segment vertical>
                        <Header as={"h3"}>Description</Header>
                        <Form.TextArea name={"description"}
                                       autoHeight
                                       placeholder='Try adding multiple lines'/>
                    </Segment>
                    <Segment vertical>
                        <Header as={"h3"}>Requested Skills</Header>
                        <Dropdown
                            multiple
                            search
                            selection
                            fluid
                            options={skillOptions}
                            placeholder='Choose skills'
                        />
                    </Segment>
                    <Button color={"green"} type={"submit"}>
                        Create
                    </Button>
                </Form>
            </Segment>
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


interface CreateEditorProps {
    router?: SingletonRouter;
}

const CreateEditor: React.SFC<CreateEditorProps> = ({router}) => (
    <Mutation
        mutation={CREATE_NEW_JOB}
        refetchQueries={[{query: GET_ALL_JOBS}]}
        awaitRefetchQueries
    >
        {(createJob, {loading}) => (
            <CreateEditorComponent
                loading={loading}
                onCreate={async data => {
                    await createJob({
                        variables: {
                            title: data.title,
                            description: data.description,
                            org: data.organization
                        }
                    });
                    await router.replace("/jobs");
                }}
            />
        )}
    </Mutation>
);

export default withRouter(CreateEditor);