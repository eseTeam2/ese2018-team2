import * as React from "react";
import {Button, Container, Grid, Header, Segment} from "semantic-ui-react";
import NavBar from "../../layout/header/NavBar";
import ApplyButton from "../../student/ApplyButton";
import JobDeleteButton from "./JobDeleteButton";
import JobDetailGroup from "./JobDetailGroup";

const Page = ({job}) => (
    <div>
        <NavBar/>
        <Container>
            <Grid>
                <Grid.Column width={13}>
                    <JobDetailGroup job={job}/>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Segment>
                        <Header>TODO</Header>
                        <Button.Group vertical>
                            <JobDeleteButton job={{id: job}}/>
                            <ApplyButton jobId={job}/>
                        </Button.Group>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    </div>
);

Page.getInitialProps = ({query}) => ({job: query["id"]});

export default Page;
