import React from "react";
import {Container, Header} from "semantic-ui-react";
import { withIntialMe } from "../../lib/withMe";
import NavBar from "../Frame/NavBar";
import SingleJobOverview from "./Overview/SingleJobOverview";
import NotificationContainer from "../Notification/NotificationContainer";

export const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <SingleJobOverview />
        <NotificationContainer notificationTuples={
            [
                {
                    message: "First notification worked!",
                    positive: true,
                    triggerContent: "First Notification",
                    triggerOnClick: () => (alert("First one works!"))
                }
            ]
        }>
            <Header as={"h1"}>Noice Page</Header>
        </NotificationContainer>
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
