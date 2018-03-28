import PropTypes from 'prop-types';
import React from 'react';

import { Button, Message } from './';
import { Input, Label } from './forms';


/**
 * Form for obtaining a new password from the user.
 *
 * Before being submitted, the form ensures that the new password and confirmation are equal.
 */
class NewPasswordForm extends React.Component {
  static defaultProps = {
    errors: [],
  };

  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    password: '',
    passwordConfirmation: '',
    passwordMatch: true,
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value }, () => (
    this.setState({ passwordMatch: this.state.password === this.state.passwordConfirmation })))

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Label htmlFor="password">
          New Password

          <Message messages={this.props.errors} />

          <Input
            autoComplete="new-password"
            autoFocus
            id="password"
            name="password"
            onChange={this.handleInputChange}
            required
            type="password"
            value={this.state.password}
          />
        </Label>
        <Label htmlFor="passwordConfirmation">
          Confirm Password

          {!this.state.passwordMatch && (
            <Message messages={['Passwords do not match.']} />
          )}

          <Input
            autoComplete="new-password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={this.handleInputChange}
            required
            type="password"
            value={this.state.passwordConfirmation}
          />
        </Label>
        <Button disabled={!this.state.passwordMatch} type="submit">Reset Password</Button>
      </form>
    );
  }
}


export default NewPasswordForm;
