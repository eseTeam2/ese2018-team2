import * as React from "react";
import { Form, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface TemporaryJobFormProps {
  handleChange: (e: any, x: { name: string; value }) => void;
}

interface TemporaryJobFormState {
  start: Date;
  end: Date;
}

class TemporaryJobForm extends React.Component<
  TemporaryJobFormProps,
  TemporaryJobFormState
> {
  state = {
    start: new Date(),
    end: new Date()
  };

  render() {
    return (
      <Form.Group>
        <Form.Field>
          <label>
            <Icon name="calendar" />
            Startdatum
          </label>
          <DatePicker
            selected={this.state.start}
            placeholderText={"Datum Auswählen"}
            dateFormat="EEEE, d.M.yyyy"
            onChange={(date, e) => {
              this.setState({ start: date });
              this.props.handleChange(e, { name: "start", value: date });
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>
            <Icon name="calendar" />
            Enddatum
          </label>
          <DatePicker
            selected={this.state.end}
            placeholderText={"Datum Auswählen"}
            dateFormat="EEEE, d.M.yyyy"
            onChange={(date, e) => {
              this.setState({ end: date });
              this.props.handleChange(e, { name: "end", value: date });
            }}
          />
        </Form.Field>
        <Form.Input width={3} label="Arbeitsstunden pro Woche" />
      </Form.Group>
    );
  }
}

export default TemporaryJobForm;
