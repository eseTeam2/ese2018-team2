import {Button, Container, Icon, Segment} from "semantic-ui-react";
import * as React from "react";
import Link from "next/link";

export default () => (
    <Container>
        <Segment basic padded="very" textAlign="center">
            <Link href={"/jobs/create"}>
                <Button icon labelPosition="right">
                    Get Started
                    <Icon name="arrow right"/>
                </Button>
            </Link>
        </Segment>
    </Container>
);
