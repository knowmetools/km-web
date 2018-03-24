import PropTypes from 'prop-types';
import React from 'react';

import { PasswordForm } from '../components';
import { Account } from '../services';


class EmailVerificationContainer extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        key: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    isComplete: false,
  };

  /**
   * Event Handlers
   */

  handleVerifyEmail = (password) => {
    Account.verifyEmail(this.props.match.params.key, password)
      .then(() => this.setState({ isComplete: true }))
      .catch(error => alert(JSON.stringify(error.response.data, null, 2)));
  };

  /**
   * Component Methods
   */

  render() {
    if (this.state.isComplete) {
      return (
        <React.Fragment>
          <h1>Email Verified</h1>
          <p>Your email address has been successfully verified.</p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <h1>Verify your Email Address</h1>
        <PasswordForm onSubmit={this.handleVerifyEmail} />
      </React.Fragment>
    );
  }
}


export default EmailVerificationContainer;
