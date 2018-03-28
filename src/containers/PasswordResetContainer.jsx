import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Message, NewPasswordForm, PageHeader } from '../components';
import { Account } from '../services';
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

  state = {
    isComplete: false,
    keyErrors: [],
    nonFieldErrors: [],
    passwordErrors: [],
  };

  /**
   * Event Handlers
   */

  handleResetPassword = async (password) => {
    try {
      await Account.resetPassword(this.props.match.params.key, password);
    } catch (error) {
      if (error.response) {
        const { response } = error;

        if (response.status === 400) {
          return this.setState({
            keyErrors: response.data.key || [],
            nonFieldErrors: response.data.non_field_errors || [],
            passwordErrors: response.data.password || [],
          });
        } else if (response.status >= 500 && response.status < 600) {
          return this.setState({
            nonFieldErrors: ['Unable to process your request. Please try again later.'],
          });
        }
      }

      throw error;
    }

    return this.setState({ isComplete: true });
  }

  /**
   * Component Methods
   */

  render() {
    let content;
    if (this.state.isComplete) {
      content = (
        <Container>
          <PageHeader>Password Reset</PageHeader>
          <p style={{ textAlign: 'center' }}>Your password has been reset.</p>
        </Container>
      );
    } else {
      const { keyErrors, nonFieldErrors, passwordErrors } = this.state;
      const formErrors = [...nonFieldErrors, ...keyErrors];

      content = (
        <Container>
          <PageHeader>Reset your Password</PageHeader>
          <FormContainer>
            <Message messages={formErrors} />
            <NewPasswordForm errors={passwordErrors} onSubmit={this.handleResetPassword} />
          </FormContainer>
        </Container>
      );
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Reset Password</title>
        </Helmet>
        {content}
      </React.Fragment>
    );
  }
}


export default PasswordResetContainer;
