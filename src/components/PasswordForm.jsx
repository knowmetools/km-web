import PropTypes from 'prop-types';
import React from 'react';

import { Button } from './';
import { Input, Label } from './forms';


/**
 * Form for prompting the user for their password.
 */
class PasswordForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    password: '',
  };

  /**
   * Event Handlers
   */

  handlePasswordChange = e => this.setState({ password: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.password);
  }

  /**
   * Component Methods
   */

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Label htmlFor="password">
          Password
          <Input
            autoComplete="current-password"
            autoFocus
            id="password"
            name="password"
            onChange={this.handlePasswordChange}
            required
            type="password"
            value={this.state.password}
          />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}


export default PasswordForm;
