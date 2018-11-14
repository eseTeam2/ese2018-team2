import React from "react";
import { Grid, Pagination } from "semantic-ui-react";
import JobItem from "../../joblist/JobItem";

interface MatchingJobsProps {
  jobs: {
    id: string;
    title: string;
    description: string;
    organization: { id: string; name };
  }[];
}

export default class MatchingJobs extends React.Component<MatchingJobsProps> {
  state = {
    activePage: 1,

    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
    totalPages: 50
  };

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    const {
      activePage,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages
    } = this.state;

    return (
      <Grid divided>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              size="mini"
              totalPages={Math.round(this.props.jobs.length / 3)}
              // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
              ellipsisItem={showEllipsis ? undefined : null}
              firstItem={showFirstAndLastNav ? undefined : null}
              lastItem={showFirstAndLastNav ? undefined : null}
              prevItem={showPreviousAndNextNav ? undefined : null}
              nextItem={showPreviousAndNextNav ? undefined : null}
            />
            <p>{activePage}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <JobItem job={this.props.jobs[3 * (activePage - 1)]} />
          </Grid.Column>
          <Grid.Column>
            <JobItem job={this.props.jobs[3 * (activePage - 1) + 1]} />
          </Grid.Column>
          <Grid.Column>
            <JobItem job={this.props.jobs[3 * (activePage - 1) + 2]} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
