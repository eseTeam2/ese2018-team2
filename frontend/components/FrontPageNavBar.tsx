import React from "react";
import {Button, Container, Divider, Dropdown, Flag, Grid, Header, Icon, Image, Menu, Select} from "semantic-ui-react";
import {SingletonRouter, withRouter} from "next/router";
import Link from "next/link";

interface FrontPageNavBarProps {
    router?: SingletonRouter;
}

interface FrontPageNavBarState {
    activeItem: String;
}

class FrontPageNavBar extends React.Component<FrontPageNavBarProps, FrontPageNavBarState> {

    state = {};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;

        const countryOptions = [
            {key: 'gb', value: 'gb', flag: 'gb', text: 'English'},
            {key: 'ch', value: 'ch', flag: 'ch', text: 'Deutsch'},
            {key: 'fr', value: 'fr', flag: 'fr', text: 'Français'},
            {key: 'it', value: 'it', flag: 'it', text: 'Italiano'}
        ];
        return (
            <React.Fragment>
                <Grid columns={2}>
                    <Grid.Column>
                        <Image src={"../static/Logo0.jpeg"} size={"small"}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Menu secondary fluid stackable text>
                            <Menu.Menu position={"right"}>
                                <Select placeholder='Select your country' options={countryOptions}/>
                                <Menu.Item>
                                    <Button>Log in</Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button>Register</Button>
                                </Menu.Item>

                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid>
                <Container centered>
                    <Menu pointing secondary widths={2}>
                        <Menu.Item
                            name='students'
                            active={activeItem === 'students'}
                            onClick={this.handleItemClick}
                        >
                            <Header as='h1' icon>
                                <Icon name='student'/>
                                For Students
                                <Header.Subheader>Manage your account settings and set e-mail
                                    preferences.</Header.Subheader>
                            </Header>
                        </Menu.Item>
                        <Menu.Item
                            name='business'
                            active={activeItem === 'business'}
                            onClick={this.handleItemClick}
                        >
                            <Header as='h1' icon>
                                <Icon name='building'/>
                                For Business
                                <Header.Subheader>Manage your account settings and set e-mail
                                    preferences.</Header.Subheader>
                            </Header>
                        </Menu.Item>
                    </Menu>
                </Container>
            </React.Fragment>
        )
            ;
    }
}

export default withRouter(FrontPageNavBar);
