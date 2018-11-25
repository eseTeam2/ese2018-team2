import * as React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../layout/header/NavBar";
import JobDetailGroup from "./JobDetailGroup";

const Page = ({ job }) => (
  <div>
    <NavBar />
    <Container>
      <JobDetailGroup job={job} />
    </Container>
  </div>
);

Page.getInitialProps = ({ query }) => ({ job: query["id"] });

export default Page;
