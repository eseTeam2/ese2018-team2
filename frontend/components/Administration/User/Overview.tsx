import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import { Breadcrumb, Icon, Radio, Segment, Table } from "semantic-ui-react";

const query = gql`
  query GET_USERS($onlyAdmins: Boolean) {
    users(onlyAdmins: $onlyAdmins) {
      id
      email
      firstname
      lastname
      siteAdmin
    }
  }
`;

interface OverviewProps {}
interface OverviewState {
  onlyAdmins: boolean;
}

class Overview extends React.Component<OverviewProps, OverviewState> {
  state = {
    onlyAdmins: false
  };

  toggleOnlyAdmins = () => {
    this.setState({ onlyAdmins: !this.state.onlyAdmins });
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb size="big">
          <Breadcrumb.Section>Übersicht</Breadcrumb.Section>
        </Breadcrumb>
        <Segment basic>
          <Radio
            toggle
            checked={this.state.onlyAdmins}
            label={"Nur Admin"}
            onChange={this.toggleOnlyAdmins}
          />
        </Segment>
        <Query query={query} variables={{ onlyAdmins: this.state.onlyAdmins }}>
          {({ loading, error, data }) => (
            <Segment basic loading={loading}>
              {error && <p>{error.message}</p>}
              {!error && (
                <Table singleLine fixed>
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
                        <Table.Cell>
                          {user.siteAdmin ? (
                            <Icon color="green" name="checkmark" size="large" />
                          ) : (
                            ""
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Segment>
          )}
        </Query>
      </React.Fragment>
    );
  }
}

export default Overview;
