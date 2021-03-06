import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import NavBar from "../Frame/NavBar";
import SearchBoxComponent from "../Search/SearchBox";
import ReactDatePicker from "react-datepicker";

export default () => (
  <div>
    <NavBar />
    <Container>
      <SearchBoxComponent />
    </Container>
  </div>
);
