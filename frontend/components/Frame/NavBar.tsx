import Link from "next/link";
import { Button, Dropdown, Image, Menu } from "semantic-ui-react";
import { withMe, WithMeProps } from "../../lib/withMe";
import LogoutDropdownItem from "./LogoutDropdownItem";

const UserDropdownComponent: React.SFC<WithMeProps> = ({ me }) => (
  <Dropdown item text={`${me.firstname} ${me.lastname}`}>
    <Dropdown.Menu>
      <Link href={"/me"} passHref>
        <Dropdown.Item content={"Profil"} as={"a"} />
      </Link>
      <LogoutDropdownItem />
    </Dropdown.Menu>
  </Dropdown>
);

const UserDropdown = withMe(UserDropdownComponent);

const userItems = [
  <Menu.Item name={"Jobangebote"} />,
  <Menu.Item name={"Bewerbungen"} />,
  <Link href={"/me"} passHref>
    <Menu.Item name={"Profil"} />
  </Link>
];

const adminItems = [
  <Menu.Item name={"Offene Jobinserate"} />,
  <Menu.Item>
    <Dropdown text={"Verwalten"}>
      <Dropdown.Menu>
        <Dropdown.Item>Benutzende</Dropdown.Item>
        <Dropdown.Item>Organizationen</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Item>
];

const NavBarComponent: React.SFC<WithMeProps> = ({ me }) => (
  <Menu size="large" stackable borderless>
    <Menu.Item>
      <Link href={"/"} passHref>
        <a>
          <Image size={"tiny"} centered src={"/static/logo.png"} />
        </a>
      </Link>
    </Menu.Item>

    {me && !me.siteAdmin && userItems}

    {me && me.siteAdmin && adminItems}

    <Menu.Item position={"right"}>
      {!me && (
        <Link href={"/login"} passHref>
          <a>
            <Button basic color={"green"} content={"Login / Registrieren"} />
          </a>
        </Link>
      )}
      {me && <UserDropdown />}
    </Menu.Item>
  </Menu>
);

const NavBar = withMe(NavBarComponent);

export default NavBar;
