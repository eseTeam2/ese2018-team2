import * as React from "react";
import { Button, Table, Header } from "semantic-ui-react";
import { Job } from "../../../../backend/packages/models/index";
import Router from "next/router";
import Link from "next/link";

interface OrganizationOverviewItemProps {
  job: Job;
}

const OrganizationOverviewItem: React.FC<OrganizationOverviewItemProps> = ({
  job
}) => (
  <Table.Row
    key={job.id}
    onClick={async e => {
      e.preventDefault();
      await Router.push({
        pathname: "/org/jobs",
        query: {
          detail: job.id
        }
      });
    }}
  >
    <Table.Cell>
      <strong>{job.title}</strong>
    </Table.Cell>
    <Table.Cell />
    <Table.Cell>
      <Link href={"/org/jobs?id=" + job.id}>
        <Button as="a" icon={"arrow right"} floated="right" />
      </Link>
    </Table.Cell>
  </Table.Row>
);

export default OrganizationOverviewItem;
