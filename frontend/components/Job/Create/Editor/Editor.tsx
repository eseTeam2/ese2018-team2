import {Button, Container, Dropdown, Form, Header, Icon, Segment} from "semantic-ui-react";
import * as React from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {SingletonRouter, withRouter} from "next/router";
import {GET_ALL_JOBS} from "../../../../pages/jobs";
import OrganizationSelect from "../../../Organization/OrganizationSelect";
import JobDetails from "../../Detail/JobDetails";


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
        formData: { title: string; description: string; organization: { id: string } }
    ) => void;

    loading: boolean;

}

class CreateEditorComponent extends React.Component<CreateEditorComponentProps> {
    state = {
        title: "",
        description: "",
        organization: {
            name: "",
            id:""
        },
        skills: []
    };

    handleSubmit = e => {
        this.props.onCreate(this.state);
        e.preventDefault();
    };

    render() {
        return (
            <Container>
                <Segment attached={"top"}>
                    <Header as={"h1"}>Create your Job offer</Header>
                    <Form onSubmit={this.handleSubmit} loading={this.props.loading}>
                        <Segment vertical>
                            <Header as={"h3"}>Job Title</Header>

                            <Form.TextArea
                                name={"title"}
                                rows={1}
                                placeholder='Try adding multiple lines'
                                onChange={(e, data) => (this.setState({title: data.value}))}
                            />
                        </Segment>
                        <Segment vertical>
                            <Header as={"h3"}>Organization</Header>
                            <Form.Field name={"organization"}>
                                <OrganizationSelect handleChange={(e, data) => {
                                    this.setState({
                                        organization: {
                                            name: data.options.filter(org => org.key == data.value)[0].text,
                                            id: data.options.filter(org => org.key == data.value)[0].key
                                        }
                                    });
                                }}/>
                            </Form.Field>
                        </Segment>
                        <Segment vertical>
                            <Header as={"h3"}>Description</Header>
                            <Form.TextArea name={"description"}
                                           autoHeight
                                           placeholder='Try adding multiple lines'
                                           onChange={(e, data) => (this.setState({description: data.value}))}
                            />
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
                                onChange={(e, data) => {
                                    const skills = data.value.map((skillIndex) => ({
                                        key: skillOptions[skillIndex - 1].key,
                                        value: skillOptions[skillIndex - 1].value,
                                        text: skillOptions[skillIndex - 1].text,
                                    }));
                                    this.setState({...this.state, skills});
                                }
                                }
                            />
                        </Segment>
                        <Segment basic clearing>
                            <Button
                                icon
                                labelPosition="right"
                                color={"green"}
                                type={"submit"}
                                size="huge"
                                floated="right">
                                <Icon name="arrow right"/>
                                Publish
                            </Button>
                        </Segment>
                    </Form>
                </Segment>
                <Segment attached>
                    <Header as='h2'>
                        <Icon name='eye'/>
                        <Header.Content>
                            Preview your job insert
                        </Header.Content>
                    </Header> </Segment>
                <Segment attached="bottom">
                    <JobDetails
                        job={
                            {
                                id: "",
                                title: this.state.title,
                                description: this.state.description,
                                skills: this.state.skills,
                                organization: {
                                    name: this.state.organization.name
                                }
                            }
                        }
                        loading={false}
                    />
                </Segment>
            </Container>
        );
    }
}


const CREATE_NEW_JOB = gql`
mutation CREATE_JOB($title: String!, $description: String, $org: ID!) {
    createJob(input: {title: $title, description: $description, organization: $org}) {
       id
       title
       description
    }
}
`;


interface CreateEditorProps {
    router?: SingletonRouter;
}

const Editor: React.SFC<CreateEditorProps> = ({router}) => (
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
                            org: data.organization.id
                        }
                    });
                    await router.replace("/jobs");
                }}
            />
        )}
    </Mutation>
);

export default withRouter(Editor);