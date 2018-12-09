import * as React from "react";
import { Button, Table, Header } from "semantic-ui-react";
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
    <Table.Cell>
      <strong>{job.title}</strong>
    </Table.Cell>
    <Table.Cell textAlign={"center"}>
      {console.log(data)}
      {!error &&
        !!data.applicationsForJob && (
          <Header as={"h5"}>{data.applicationsForJob.length}</Header>
        )}
      {!error && !data.applicationsForJob && <Header as={"h4"}>0</Header>}
    </Table.Cell>
    <Table.Cell>
      <Link href={"/org/jobs?id=" + job.id}>
        <Button as="a" icon={"arrow right"} floated="right" />
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
