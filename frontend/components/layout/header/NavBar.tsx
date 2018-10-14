import React from "react";
import { Menu } from "semantic-ui-react";
import { SingletonRouter, withRouter } from "next/router";
import { Link } from "../../../lib/routes";

interface NavigationProperties {
  router?: SingletonRouter;
}

class Navigation extends React.Component<NavigationProperties> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Menu fluid widths={6}>
        <Link href={"/"}>
          <Menu.Item
            as="a"
            href="/"
            name="home"
            active={this.props.router.asPath === "/"}
          >
            Home
          </Menu.Item>
        </Link>
        <Link href={"/jobs"}>
          <Menu.Item
            as="a"
            href="/jobs"
            name="jobs"
            active={this.props.router.asPath === "/jobs"}
          >
            Jobs
          </Menu.Item>
        </Link>
        <Link href={"/jobdetails"}>
          <Menu.Item
            as="a"
            href="/jobdetails"
            name="home"
            active={this.props.router.asPath === "/jobdetails"}
          >
            Jobdetails
          </Menu.Item>
        </Link>
      </Menu>
    );
  }
}

const NavBar = withRouter(Navigation);

export default NavBar;
