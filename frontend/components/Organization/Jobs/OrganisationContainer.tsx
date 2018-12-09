import { Button, Container, Header, Segment, Table } from "semantic-ui-react";
import * as React from "react";
import Link from "next/link";
import OrganizationOverviewItem from "./OrganizationOverviewItem";

interface Job {
  id: string;
  title: string;
  description: string;
  salary: number;
}

interface Organisation {
  id: string;
  name: string;
  jobs: {
    id: string;
    title: string;
  };
}

interface OrganisationContainerProps {
  org: Organisation;
}

const OrganisationContainer: React.FC<OrganisationContainerProps> = ({
  org
}) => (
  <Container>
    <Header as="h3" attached="top" block>
      {org.name}
    </Header>
    <Segment attached>
      <Table selectable celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Header>Jobtitel</Header>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Header>Bewerbungen</Header>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <Link href={"/org/jobs/create"}>
                <Button as="a" icon={"plus"} floated="right" />
              </Link>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {org.jobs.map(job => (
            <OrganizationOverviewItem key={job.id} job={job} />
          ))}
        </Table.Body>
      </Table>
    </Segment>
  </Container>
);

export default OrganisationContainer;
