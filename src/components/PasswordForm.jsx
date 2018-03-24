import PropTypes from 'prop-types';
import React from 'react';


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

  handlePasswordChange = (e) => this.setState({ password: e.target.value });

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
        <label htmlFor="password">Password</label>
        <input
          autoComplete="current-password"
          autoFocus
          id="password"
          name="password"
          onChange={this.handlePasswordChange}
          required
          type="password"
          value={this.state.password}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}


export default PasswordForm;
