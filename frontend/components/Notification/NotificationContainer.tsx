import {Button, ButtonProps, Container, Message, Segment, TransitionablePortal} from "semantic-ui-react";
import * as React from "react";

interface NotificationContainerProps {
    notificationTuples: {
        message: string;
        positive: boolean;
        triggerContent: string;
        triggerOnClick: () => void;
    }[];
}

interface NotificationContainerState {
    notificationStates: {
        [key: string]: boolean;
    };
}

class NotificationContainer extends React.Component<NotificationContainerProps, NotificationContainerState> {


    constructor(props) {
        super(props);
        this.state = {notificationStates: {}};
    }

    handleClick = (e, message) => {
        this.setState({notificationStates: {[message]: true}});
    };

    componentDidMount(): void {
        console.log(this.props);
        this.props.notificationTuples
            .map(notificationTuple => {
                this.setState({
                    notificationStates: Object.assign({}, this.state.notificationStates, {[notificationTuple]: false})
                })
            })
    }


    render() {
        return (
            <Container>
                {console.log(this.state)}
                {this.props.notificationTuples.map(notificationTuple => (
                    <TransitionablePortal
                        open={this.state.notificationStates[notificationTuple.message]}
                        transition={{animation: "slide down", duration: 100}}
                    >
                        <Segment>
                            <Message positive={notificationTuple.positive} content={notificationTuple.message}/>
                        </Segment>
                    </TransitionablePortal>
                ))}
                {this.props.children}
                <Button.Group>
                    {this.props.notificationTuples.map(notificationTuple => (
                        <Container onClick={e => this.handleClick(e, notificationTuple.message)}>
                            <Button
                                content={notificationTuple.triggerContent}
                                onClick={
                                    notificationTuple.triggerOnClick
                                }/>
                        </Container>))}
                </Button.Group>
            </Container>
        );
    }
}

export default NotificationContainer;