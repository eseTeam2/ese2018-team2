import * as React from "react";
import { Container } from "semantic-ui-react";
import ConfirmEmail from "./ConfirmEmail";
import UserRegistration from "./UserRegistration";
import NavBar from "../Frame/NavBar";
import { SingletonRouter, withRouter } from "next/router";

interface PageProps {
  router?: SingletonRouter;
}

const Page: React.FC<PageProps> = ({ router }) => {
  return (
    <React.Fragment>
      <NavBar />
      <Container>
        {router.query.id && <ConfirmEmail id={router.query.id[0]} />}
        {!router.query.id && <UserRegistration />}
      </Container>
    </React.Fragment>
  );
};

export default withRouter(Page);
