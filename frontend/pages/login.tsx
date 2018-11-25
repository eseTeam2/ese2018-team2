import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from "semantic-ui-react";
import Login from "../components/Auth/Login";

export default () => (
  <React.Fragment>
    <Grid columns={2}>
      <Grid.Column>
        <Grid columns={2}>
          <Grid.Column>
            <Image centered src={"../static/logo_04.png"} />
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
    <Login />
  </React.Fragment>
);
