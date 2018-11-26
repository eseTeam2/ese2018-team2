import * as React from "react";
import {Container, Grid, Header, Image, List, Segment, Table} from "semantic-ui-react";
import ApplyButton from "../../student/ApplyButton";

interface JobDetailsProps {
    loading: boolean;
    job: {
        id: string
        title: string;
        description: string;
        skills?: {
            key: number;
            value: number;
            text: string;
        }[  ];
        organization: {
            id:string;
            name: string;
        }
    }
}

class JobDetails extends React.Component<JobDetailsProps> {

    render() {
        return (
            <Container>
                <Segment attached="top" clearing>
                    <Header as={"h1"}>
                        {!this.props.loading && this.props.job.title}
                        <Header.Subheader>
                            {!this.props.loading && this.props.job.organization.name}
                        </Header.Subheader>
                    </Header>
                </Segment>
                <Segment attached={"bottom"}>
                    <Grid celled='internally'>
                        <Grid.Column width={11}>
                            <Segment vertical>
                                <Header as={"h3"}>Description</Header>
                                <Container fluid>{!this.props.loading && this.props.job.description}</Container>
                            </Segment>
                            <Segment vertical>
                                <Header as={"h3"}>Required Skills</Header>
                                <List bulleted>
                                    {this.props.job.skills ? this.props.job.skills.map(skill => {
                                        console.log(skill.text);
                                        return (
                                            <List.Item key={skill.text} content={skill.text}/>
                                        );
                                    }) : ""}
                                </List>
                            </Segment>
                            <Segment vertical>
                                <Header as={"h3"}>Contact us</Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={5}>
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
                                <ApplyButton disabled job="asdfas"/>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        );
    }
}

export default JobDetails;