import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { NewPasswordForm, PageHeader } from '../components';
import { Container } from './';


const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 25em;
`;


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
        <FormContainer>
          <NewPasswordForm />
        </FormContainer>
      </Container>
    );
  }
}


export default PasswordResetContainer;
