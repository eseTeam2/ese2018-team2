import {Header, Segment} from "semantic-ui-react";
import * as React from "react";

interface FieldProps {
    title: string;
    children?: any;
}

const Field: React.SFC<FieldProps> = ({title, children}) => (
    <Segment vertical>
        <Header as={"h3"}>{title}</Header>
        {children}
    </Segment>
);

export default Field;