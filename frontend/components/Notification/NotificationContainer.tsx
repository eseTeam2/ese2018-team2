import {Button, Container, Grid, Header, Message, Segment, Transition} from "semantic-ui-react";
import * as React from "react";
import {ReactNode} from "react";

interface NotificationContainerProps {
    title: string;
    notificationTuples: {
        message: string;
        positive: boolean;
        trigger: ReactNode;
    }[];
}

interface NotificationContainerState {
}

class NotificationContainer extends React.Component<NotificationContainerProps, NotificationContainerState> {

    constructor(props) {
        super(props);
        this.state = {};
    };

    handleClick = (e, message) => {
        this.setState({[message]: true});
    };

    componentDidMount(): void {
        this.props.notificationTuples
            .map(notificationTuple => {
                this.setState({[notificationTuple.message]: false})
            })
    };

    render() {
        return (
            <Container>
                {
                    this.props.notificationTuples.map((notificationTuple) => {
                        if (this.state[notificationTuple.message]) {
                            return (
                                <React.Fragment key={notificationTuple.message}>
                                    <Transition mountOnShow visible={this.state[notificationTuple.message]}
                                                animation='slide down'
                                                duration={500}>
                                        <Message positive={notificationTuple.positive}
                                                 content={notificationTuple.message}/>
                                    </Transition>
                                </React.Fragment>
                            );
                        }
                    })
                }
                <Header attached="top" as={"h1"}>{this.props.title}</Header>
                <Segment attached>{this.props.children}</Segment>
                <Segment attached={"bottom"}>
                    <Grid columns={this.props.notificationTuples.length}>
                        {this.props.notificationTuples.map(notificationTuple => (
                            <Grid.Column key={notificationTuple.message} width={2} onClick={e => this.handleClick(e, notificationTuple.message)}>
                                {notificationTuple.trigger}
                            </Grid.Column>))}
                    </Grid>
                </Segment>
            </Container>
        );
    }
}

export default NotificationContainer;