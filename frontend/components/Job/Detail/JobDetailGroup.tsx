import {ApolloError} from "apollo-boost";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {Container, Dimmer, Loader} from "semantic-ui-react";
import * as React from "react";
import JobDetails from "./JobDetails";

interface JobDetailGroupComponentProps {
    loading: boolean;
    error: ApolloError;
    data: GetJobsWithDetails;
}

export const JobDetailGroupComponent: React.SFC<JobDetailGroupComponentProps> = ({loading, error, data}) => (
    <Container>
        {error && <p>{error.message}</p>}
        <Dimmer.Dimmable dimmed={loading}>
            <Dimmer active={loading}>
                <Loader active={loading}/>
            </Dimmer>
            {!loading && <JobDetails job={data.jobs[0]} loading={false}/>}
        </Dimmer.Dimmable>
    </Container>
);

export const GET_JOB_WITH_DETAILS = gql`
  query GetJobWithDetails($id: String!) {
    jobs(id: $id) {
      id
      title
      description
      organization{
        id
        name
      }
    }
  }
`;

interface GetJobsWithDetails {
    jobs: {
        id: string;
        title: string;
        description: string;
        organization: {
            id: string;
            name: string;
        }
    }[];
}

interface JobDetailGroupProps {
    job: string;
}

const JobDetailGroup: React.SFC<JobDetailGroupProps> = ({job}) => {
    return (
        <Query query={GET_JOB_WITH_DETAILS} variables={{id: job}} ssr>
            {({loading, error, data}) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
                    <JobDetailGroupComponent
                        loading={loading}
                        error={error}
                        data={data as GetJobsWithDetails}
                    />
                );
            }
            }
        </Query>
    );
};

export default JobDetailGroup;
