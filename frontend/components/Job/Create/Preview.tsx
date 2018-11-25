import * as React from "react";
import {Button, Grid, Header, Icon, Image, List, Segment, Table} from "semantic-ui-react";

interface PreviewProps {
    userAuth: boolean;
    title: string;
    description: string;
    skills: {
        key: number;
        value: number;
        text: string;
    }[  ];
}

class Preview extends React.Component<PreviewProps> {

    render() {
        console.log(this.props);
        return (
            <Segment>
                <Grid celled='internally'>
                    <Grid.Column width={11}>
                        <Segment vertical>
                            <Header as="h1">
                                {this.props.title ? this.props.title : ""}
                                <Header.Subheader>Postfinance</Header.Subheader>
                            </Header>
                        </Segment>
                        <Segment vertical>
                            <Header as={"h3"}>Description</Header>
                            <p>{this.props.description ? this.props.description : ""}</p>
                        </Segment>
                        <Segment vertical>
                            <Header as={"h3"}>Required Skills</Header>
                            <List bulleted>
                                {this.props.skills.map(skill => {
                                    console.log(skill.text);
                                    return (
                                        <List.Item key={skill.text} content={skill.text}/>
                                    );
                                })}
                            </List>
                        </Segment>
                        <Segment vertical>
                            <Header as={"h3"}>Contact us</Header>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Segment basic><Button icon={"bookmark"} size="big" circular floated="right"/></Segment>
                        <Segment vertical>
                            <Header as={"h3"}>When you will work:</Header>
                            <Table basic='very' celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                        <Table.HeaderCell>Time</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>05.05.2019</Table.Cell>
                                        <Table.Cell>08:00 - 16:00</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>06.05.2019</Table.Cell>
                                        <Table.Cell>08:00 - 16:00</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                        <Segment vertical>
                            <Image bordered size="medium" src={"../../static/embedded_map.jpg"}/>
                        </Segment>
                        <Segment vertical>
                            <Button icon color={"green"} labelPosition={"right"} fluid>
                                Apply
                                <Icon name="arrow right"/>
                            </Button>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

export default Preview;