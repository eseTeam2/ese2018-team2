import * as React from "react";
import { Form } from "semantic-ui-react";

const TemporaryJobForm: React.FC = () => (
  <Form>
    <Form.Group>
      <Form.Input width={3} label="Startdatum" />
      <Form.Input width={3} label="Enddatum" />
    </Form.Group>
    <Form.Input width={3} label="Arbeitsstunden pro Woche" />
  </Form>
);

export default TemporaryJobForm;
