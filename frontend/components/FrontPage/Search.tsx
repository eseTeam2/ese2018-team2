import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Segment,
  Label
} from "semantic-ui-react";
import * as React from "react";
import { Head } from "next/document";
import ClickableLabel from "./Search/ClickableLabel";

const skillOptions = [
  { key: "angular", text: "Angular", value: "angular" },
  { key: "css", text: "CSS", value: "css" },
  { key: "design", text: "Graphic Design", value: "design" },
  { key: "ember", text: "Ember", value: "ember" },
  { key: "html", text: "HTML", value: "html" },
  { key: "ia", text: "Information Architecture", value: "ia" },
  { key: "javascript", text: "Javascript", value: "javascript" },
  { key: "mech", text: "Mechanical Engineering", value: "mech" },
  { key: "meteor", text: "Meteor", value: "meteor" },
  { key: "node", text: "NodeJS", value: "node" },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  { key: "python", text: "Python", value: "python" },
  { key: "rails", text: "Rails", value: "rails" },
  { key: "react", text: "React", value: "react" },
  { key: "repair", text: "Kitchen Repair", value: "repair" },
  { key: "ruby", text: "Ruby", value: "ruby" },
  { key: "ui", text: "UI Design", value: "ui" },
  { key: "ux", text: "User Experience", value: "ux" }
];

export default () => (
  <Container>
    <Segment basic>
      <Header as="h2">Suche nach einem Job</Header>
    </Segment>
    <Segment basic>
      <Header as={"h3"}>Rollen</Header>
      <ClickableLabel text={"Test"} detail={10} />
      <Label>
        Test
        <Label.Detail>2</Label.Detail>
      </Label>
      <Label>
        Test
        <Label.Detail>2</Label.Detail>
      </Label>
      <Label>
        Test
        <Label.Detail>2</Label.Detail>
      </Label>
    </Segment>
  </Container>
);
