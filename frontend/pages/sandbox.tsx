import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../components/Frame/NavBar";
import NotificationContainer from "../components/Notification/NotificationContainer";
import {Button} from "semantic-ui-react";

/**
 * Page for component testing purposes
 */


const notificationTuples = [
    {
        message: "First notification worked!",
        positive: true,
        trigger: (
            <Button
                content={"Frist Notification"}
                color={"green"}
                onClick={(e) => {
                    e.preventDefault();
                    alert("First one works");
                }}
            />
        ),
    },
    {
        message: "Second notification works too!",
        positive: true,
        trigger: (
            <Button
                content={"Second Notification"}
                color={"green"}
                onClick={(e) => {
                    e.preventDefault();
                    alert("First one works");
                }}
            />
        ),
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
