import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import {Container, Header, Segment} from "semantic-ui-react";
import NavBar from "../components/Frame/NavBar";
import NotificationContainer from "../components/Notification/NotificationContainer";

/**
 * Page for component testing purposes
 */


const notificationTuples = [
    {
        message: "First notification worked!",
        positive: true,
        triggerContent: "First Notification",
        triggerColor: "green",
        triggerOnClick: () => (alert("First one works!"))
    },
    {
        message: "Second notification worked!",
        positive: true,
        triggerContent: "Second Notification",
        triggerColor: "green",
        triggerOnClick: () => (alert("Second one works!"))
    },
    {
        message: "Third notification worked!",
        positive: false,
        triggerContent: "Third Notification",
        triggerColor: "red",
        triggerOnClick: () => (alert("Third one works!"))
    },
];

export default () => (
    <div>
        <NavBar/>
        <NotificationContainer title="Noice Page" notificationTuples={notificationTuples}>
            <p>Cool Thing</p>
        </NotificationContainer>
    </div>
);
