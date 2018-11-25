import * as React from "react";
import {Button, Grid, Header, Icon, Image, List, Segment, Table} from "semantic-ui-react";

const PreviewTemplate = () => (
    <Segment>
        <Grid celled='internally'>
            <Grid.Column width={11} divided>
                <Segment vertical>
                    <Header as="h1">
                        Bachelor-Praktikant/-in Fachsupport Nachforschungen
                        <Header.Subheader>Postfinance</Header.Subheader>
                    </Header>
                </Segment>
                <Segment vertical>
                    <Header as={"h3"}>Description</Header>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s
                        with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus
                        PageMaker including versions of Lorem Ipsum.</p>
                </Segment>
                <Segment vertical>
                    <Header as={"h3"}>Required Skills</Header>
                    <List bulleted>
                        <List.Item>JavaScript</List.Item>
                        <List.Item>HTML</List.Item>
                        <List.Item>CSS</List.Item>
                        <List.Item>React</List.Item>
                        <List.Item>BWL</List.Item>
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

export default PreviewTemplate;