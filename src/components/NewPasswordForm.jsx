import PropTypes from 'prop-types';
import React from 'react';

import { Button } from './';


/**
 * Form for obtaining a new password from the user.
 *
 * Before being submitted, the form ensures that the new password and confirmation are equal.
 */
class NewPasswordForm extends React.Component {
  state = {
    password: '',
    passwordConfirmation: '',
  }

  /**
   * Event Handlers
   */

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  /**
   * Component Methods
   */

  render() {
    return (
      <form onSubmit={() => {}}>
        <label htmlFor="password">
          New Password
          <input
            autoComplete="new-password"
            autoFocus
            id="password"
            name="password"
            onChange={this.handleInputChange}
            required
            type="password"
            value={this.state.password}
          />
        </label>
        <label htmlFor="passwordConfirmation">
          Confirm Password
          <input
            autoComplete="new-password"
            autoFocus
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={this.handleInputChange}
            required
            type="password"
            value={this.state.passwordConfirmation}
          />
        </label>
        <Button type="submit">Reset Password</Button>
      </form>
    );
  }
}


export default NewPasswordForm;
