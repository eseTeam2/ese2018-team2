import * as React from "react";
import { Form } from "semantic-ui-react";

const FixedJobForm: React.FC = () => (
  <Form>
    <Form.Input width={3} label="Startdatum" />
    <Form.Input width={3} label="Arbeitsstunden pro Woche" />
  </Form>
);

export default FixedJobForm;
