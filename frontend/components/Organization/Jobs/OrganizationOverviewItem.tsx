import * as React from "react";
import { Button, Table, Header, Checkbox } from "semantic-ui-react";
import Router from "next/router";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloError } from "apollo-boost";

interface Job {
  id: string;
  title: string;
  description: string;
  salary: number;
}

interface OrganizationOverviewItemProps {
  job: Job;
}

interface OrganizationOverviewItemComponentProps {
  job: Job;
  data: any;
  loading: boolean;
  error: ApolloError;
}

const OrganizationOverviewItemComponent: React.FC<
  OrganizationOverviewItemComponentProps
> = ({ job, data, loading, error }) => (
  <Table.Row
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
    <Table.Cell collapsing>
      <Checkbox />
    </Table.Cell>
    <Table.Cell>{job.title}</Table.Cell>
    <Table.Cell textAlign={"center"}>
      {console.log(data)}
      {!error &&
        !!data.applicationsForJob && <p>{data.applicationsForJob.length}</p>}
      {!error && !data.applicationsForJob && 0}
    </Table.Cell>
    <Table.Cell textAlign={"center"}>
      <Link href={"/org/jobs?id=" + job.id}>
        <Button as="a" icon={"arrow right"} size="small" />
      </Link>
    </Table.Cell>
  </Table.Row>
);

const GET_JOB_APPLICATIONS = gql`
  query GetJobAppliactions($jobId: String!) {
    applicationsForJob(jobId: $jobId) {
      id
      state
    }
  }
`;

class OrganizationOverviewItem extends React.Component<
  OrganizationOverviewItemProps
> {
  render() {
    return (
      <Query
        query={GET_JOB_APPLICATIONS}
        variables={{ jobId: this.props.job.id }}
      >
        {({ loading, error, data }) =>
          !loading && (
            <OrganizationOverviewItemComponent
              job={this.props.job}
              data={data}
              loading={loading}
              error={error}
            />
          )
        }
      </Query>
    );
  }
}

export default OrganizationOverviewItem;
