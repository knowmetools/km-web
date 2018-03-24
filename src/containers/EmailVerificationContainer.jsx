import PropTypes from 'prop-types';
import React from 'react';

import { PasswordForm } from '../components';


class EmailVerificationContainer extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        key: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  handleVerifyEmail = (password) => {
    alert("Verifying email address...");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Verify your Email Address</h1>
        <PasswordForm onSubmit={this.handleVerifyEmail} />
      </React.Fragment>
    );
  }
}


export default EmailVerificationContainer;
