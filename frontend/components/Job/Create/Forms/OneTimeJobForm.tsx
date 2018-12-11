import * as React from "react";
import { Form, Header } from "semantic-ui-react";

const OneTimeJobForm: React.FC = () => (
  <Form>
    <Form.Group>
      <Form.Input width={3} label="Startdatum" />
      <Form.Input width={3} label="Enddatum" />
    </Form.Group>
    <Form.Input width={3} label="Arbeitsstunden pro Woche" />
  </Form>
);

export default OneTimeJobForm;
