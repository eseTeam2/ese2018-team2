import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import OrganisationContainer from "./OrganisationContainer";

interface OrganisationOverviewComponentProps {
  loading: boolean;
  error: ApolloError;
  data: {
    organizations: {
      id: string;
      name: string;
      jobs: {
        id: string;
        title: string;
      }[];
    }[];
  };
}

const OrganisationOverviewComponent: React.SFC<
  OrganisationOverviewComponentProps
> = ({ loading, error, data }) => (
  <Container>
    <Header as={"h2"}>Übersicht Jobinserate</Header>
    <Segment basic loading={loading}>
      {error && <p>{error.message}</p>}
      {data &&
        data.organizations.map(org => <OrganisationContainer org={org} />)}
    </Segment>
  </Container>
);

const query = gql`
  query organizations {
    organizations {
      id
      name
      jobs {
        id
        title
      }
    }
  }
`;

export default () => (
  <Query query={query}>
    {({ loading, error, data }) => (
      <OrganisationOverviewComponent
        loading={loading}
        error={error}
        data={data}
      />
    )}
  </Query>
);
