import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Container, Header, List, Segment } from "semantic-ui-react";
import ClickableLabel from "./Search/ClickableLabel";

const skillOptions = [
  { key: "angular", text: "Angular", value: "angular" },
  { key: "css", text: "CSS", value: "css" },
  { key: "design", text: "Graphic Design", value: "design" },
  { key: "ember", text: "Ember", value: "ember" },
  { key: "html", text: "HTML", value: "html" },
  { key: "ia", text: "Information Architecture", value: "ia" },
  { key: "javascript", text: "Javascript", value: "javascript" },
  { key: "mech", text: "Mechanical Engineering", value: "mech" },
  { key: "meteor", text: "Meteor", value: "meteor" },
  { key: "node", text: "NodeJS", value: "node" },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  { key: "python", text: "Python", value: "python" },
  { key: "rails", text: "Rails", value: "rails" },
  { key: "react", text: "React", value: "react" },
  { key: "repair", text: "Kitchen Repair", value: "repair" },
  { key: "ruby", text: "Ruby", value: "ruby" },
  { key: "ui", text: "UI Design", value: "ui" },
  { key: "ux", text: "User Experience", value: "ux" }
];

const query = gql`
  query Search {
    search {
      nodes {
        title
      }
      buckets {
        role {
          id
          title
        }
        count
      }
    }
  }
`;

interface SearchComponentProps {
  loading: boolean;
  error: ApolloError;
  nodes: Array<{ title: string }>;
  buckets: Array<{ role: { id: string; title: string }; count: number }>;
}

const SearchComponent: React.SFC<SearchComponentProps> = ({
  loading,
  error,
  nodes,
  buckets
}) => (
  <Segment basic loading={loading}>
    <Header as={"h3"}>Rollen</Header>
    {error && <p>{error.message}</p>}
    {buckets.map(bucket => (
      <ClickableLabel
        key={bucket.role.id}
        text={bucket.role.title}
        detail={bucket.count}
      />
    ))}
    {
      <List>
        {nodes.map(e => (
          <List.Item key={e.title}>{e.title}</List.Item>
        ))}
      </List>
    }
  </Segment>
);

const Search = () => (
  <Query query={query}>
    {({ loading, error, data }) => (
      <SearchComponent
        loading={loading}
        error={error}
        nodes={!loading && !error ? data.search.nodes : []}
        buckets={!loading && !error ? data.search.buckets : []}
      />
    )}
  </Query>
);

export default () => (
  <Container>
    <Segment basic>
      <Header as="h2">Suche nach einem Job</Header>
    </Segment>
    <Search />
  </Container>
);
