import PropTypes from 'prop-types';
import React from 'react';

import { NewPasswordForm, PageHeader } from '../components';
import { Container } from './';


/**
 * Container to handle password resets.
 *
 * Using the reset token provided to the user in an email, the container handles reseting the user's
 * password to the new password they provide in the form.
 */
class PasswordResetContainer extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        key: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  /**
   * Component Methods
   */

  render() {
    return (
      <Container>
        <PageHeader>Reset your Password</PageHeader>
        <NewPasswordForm />
      </Container>
    );
  }
}


export default PasswordResetContainer;
