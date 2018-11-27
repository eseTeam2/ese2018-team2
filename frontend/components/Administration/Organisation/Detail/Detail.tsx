import React from "react";
import { Button, Container, Segment } from "semantic-ui-react";
import OrganizationBreadcrumb from "./OrganizationBreadcrumb";
import { withRouter } from "next/router";
import gql from "graphql-tag";
import { GET_ALL_ORGANIZATIONS } from "../Overview";
import { Mutation } from "react-apollo";
import OrganizationDeleteButton from "./OrganizationDeleteButton";

const APPROVE_ORGANIZATION = gql`
  mutation ApproveOrganization($organizationId: String!) {
    approveOrganization(organizationId: $organizationId)
  }
`;

const DetailComponent = ({ router }) => (
  <React.Fragment>
    <OrganizationBreadcrumb />
    <Segment basic>
      <Container>
        <p>TODO: Implement UPDATE and DELETE for user</p>
        {
          <Mutation
            mutation={APPROVE_ORGANIZATION}
            refetchQueries={[{ query: GET_ALL_ORGANIZATIONS }]}
            awaitRefetchQueries
          >
            {(approveOrganization, _) => (
              <Button
                content={"Approve"}
                color={"green"}
                icon="checkmark"
                labelPosition="right"
                onClick={async () => {
                  await approveOrganization({
                    variables: { organizationId: router.query.detail }
                  });
                  await router.push("/admin/organizations");
                }}
              />
            )}
          </Mutation>
        }
      </Container>
    </Segment>
    <OrganizationDeleteButton organizationId={router.query.detail} />
  </React.Fragment>
);

export default withRouter(DetailComponent);
