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
    keyErrors: [],
    nonFieldErrors: [],
  };

  /**
   * Event Handlers
   */

  handleVerifyEmail = (password) => {
    Account.verifyEmail(this.props.match.params.key, password)
      .then(() => this.setState({ isComplete: true }))
      .catch((error) => {
        if (error.response) {
          const { response } = error;

          if (response.status === 400) {
            return this.setState({
              keyErrors: response.data.key || [],
              nonFieldErrors: response.data.non_field_errors || [],
            });
          } else if (response.status >= 500 && response.status < 500) {
            return this.setState({
              nonFieldErrors: ['Unable to process your request. Please try again later.'],
            });
          }
        }

        return Promise.reject(error);
      });
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

    const { keyErrors, nonFieldErrors } = this.state;
    const formErrors = [...nonFieldErrors, ...keyErrors];

    return (
      <React.Fragment>
        <h1>Verify your Email Address</h1>
        {formErrors.length > 0 && (
          <ul>
            {formErrors.map(e => <li key={e}>{e}</li>)}
          </ul>
        )}
        <PasswordForm onSubmit={this.handleVerifyEmail} />
      </React.Fragment>
    );
  }
}


export default EmailVerificationContainer;
