import * as React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";

interface UserRegistrationComponentProps {
  loading: boolean;
  onCreate: (
    formData: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      phone: string;
      studyProgram: string;
      university: string;
    }
  ) => void;
}

class UserRegistrationComponent extends React.Component<
  UserRegistrationComponentProps
> {
  state = {
    email: "",
    password: "",
    firstPassword: "",
    secondPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    studyProgram: "",
    university: "",
    acceptTermsAndConditions: false
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.firstPassword !== this.state.secondPassword) {
      toast.error("Passwords do not match");
    } else if (!this.state.acceptTermsAndConditions) {
      toast.error("Accept Terms and Conditions to sign up");
    } else {
      this.props.onCreate({
        email: this.state.email,
        password: this.state.firstPassword,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        phone: this.state.phone,
        studyProgram: this.state.studyProgram,
        university: this.state.university
      });
      toast.success(
        "Created new Profile. Verify your email by clicking the confirmation link in your inbox"
      );
    }
  };

  toggleTermsAndConditions = () => {
    this.setState({
      acceptTermsAndConditions: !this.state.acceptTermsAndConditions
    });
    console.log(this.state.acceptTermsAndConditions);
  };

  render() {
    const initialValues = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              width={3}
              required
              label="Firstname"
              name="firstname"
              value={initialValues.firstname}
              placeholder="Firstname"
              onChange={this.handleChange}
            />
            <Form.Input
              width={3}
              required
              label="Lastname"
              name="lastname"
              value={initialValues.lastname}
              placeholder="Lastname"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={6}
              required
              label="Email"
              name="email"
              value={initialValues.email}
              placeholder="Email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={6}
              required
              label="University"
              name="university"
              value={initialValues.university}
              placeholder="University"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={6}
              required
              label="Study Program"
              name="studyProgram"
              value={initialValues.studyProgram}
              placeholder="Study Program"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={6}
              required
              label="Phone"
              name="phone"
              value={initialValues.phone}
              placeholder="Phone"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={3}
              required
              type="password"
              label="Enter Password"
              name="firstPassword"
              value={initialValues.firstPassword}
              placeholder="Password"
              onChange={this.handleChange}
            />
            <Form.Input
              width={3}
              required
              type="password"
              label="Repeat Password"
              name="secondPassword"
              value={initialValues.secondPassword}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Checkbox
            name={"acceptTermsAndConditions"}
            required
            label="I agree to the Terms and Conditions"
            checked={initialValues.acceptTermsAndConditions}
            onChange={this.toggleTermsAndConditions}
          />
          <Button color="green" type="submit">
            Register
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default UserRegistrationComponent;
