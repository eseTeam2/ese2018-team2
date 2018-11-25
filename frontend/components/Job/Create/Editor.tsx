import {Dropdown, Form, Header, Segment, TextArea} from "semantic-ui-react";
import * as React from "react";
import Preview from "./Preview";


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

interface EditorProps {
    userAuth: boolean;
}

interface EditorState {
    title: string;
    description: string;
    skills: {
        key: number;
        value: number;
        text: string;
    }[  ]
}

class Editor extends React.Component<EditorProps, EditorState> {
    public static defaultProps = {
        userAuth: true
    };

    state = {
        title: "",
        description: "",
        skills: []
    };

    render() {

        return (
            <React.Fragment>
                <Segment>
                    <Header as={"h1"}>Create your Job offer</Header>
                    <Segment vertical>
                        <Header as={"h3"}>Job Title</Header>
                        <Form>
                            <TextArea onChange={(e, data) => (this.setState({title: data.value}))} rows={1}
                                      placeholder='Try adding multiple lines'/>
                        </Form>
                    </Segment>
                    <Segment vertical>
                        <Header as={"h3"}>Description</Header>
                        <Form>
                            <TextArea onChange={(e, data) => (this.setState({description: data.value}))} autoHeight
                                      placeholder='Try adding multiple lines'/>
                        </Form>
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
                                console.log(data.value);

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
                </Segment>
                <Header as={"h1"}>Preview</Header>
                <Preview title={this.state.title} description={this.state.description} skills={this.state.skills}/>
            </React.Fragment>
        );
    }
}

export default Editor;