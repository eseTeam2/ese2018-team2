import React from "react";
import { Header, Segment, Table, Tab } from "semantic-ui-react";
import gql from "graphql-tag";
import { string } from "prop-types";
import { ApolloError } from "apollo-boost";
import { Query } from "react-apollo";

const query = gql`
  query GET_USERS {
    users {
      id
      email
      firstname
      lastname
      siteAdmin
    }
  }
`;

interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  siteAdmin: boolean;
}

interface GetUsersData {
  users: Array<User>;
}

interface OverviewProps {
  data?: GetUsersData;
  loading: boolean;
  error: ApolloError;
}

const Overview: React.SFC<OverviewProps> = ({ loading, error, data }) => (
  <React.Fragment>
    <Header as={"h2"}>Übersicht</Header>
    <Segment basic loading={loading}>
      {error && <p>{error.message}</p>}
      {!error && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Vornamen</Table.HeaderCell>
              <Table.HeaderCell>Nachnamen</Table.HeaderCell>
              <Table.HeaderCell>Admin</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.users.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.firstname}</Table.Cell>
                <Table.Cell>{user.lastname}</Table.Cell>
                <Table.Cell>{user.siteAdmin ? "Ja" : "Nein"}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Segment>
  </React.Fragment>
);

export default () => (
  <Query query={query}>
    {({ loading, error, data }) => (
      <Overview loading={loading} error={error} data={data} />
    )}
  </Query>
);
