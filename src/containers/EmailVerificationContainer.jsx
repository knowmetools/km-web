import React from 'react';

import { PasswordForm } from '../components';


class EmailVerificationContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Verify your Email Address</h1>
        <PasswordForm />
      </React.Fragment>
    );
  }
}


export default EmailVerificationContainer;
