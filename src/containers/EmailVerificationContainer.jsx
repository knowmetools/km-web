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

  /**
   * Event Handlers
   */

  handleVerifyEmail = (password) => {
    Account.verifyEmail(this.props.match.params.key, password)
      .then(data => alert(data))
      .catch(error => alert(JSON.stringify(error.response.data, null, 2)));
  };

  /**
   * Component Methods
   */

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
