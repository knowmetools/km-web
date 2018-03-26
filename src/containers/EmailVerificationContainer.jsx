import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { Message, PasswordForm } from '../components';
import { Container } from '../containers';
import { Account } from '../services';


const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 25em;
`;


const Heading = styled.h1`
  color: ${props => props.theme.colors.brandPrimary};
  font-size: ${props => props.theme.fonts.sizes.headings[1]};
  line-height: 1.25em;
  margin: .5em 0;
  text-align: center;
`;


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
        <Container>
          <Heading>Email Verified</Heading>
          <p style={{ textAlign: 'center' }}>Your email address has been successfully verified.</p>
        </Container>
      );
    }

    const { keyErrors, nonFieldErrors } = this.state;
    const formErrors = [...nonFieldErrors, ...keyErrors];

    return (
      <Container>
        <Heading>Verify your Email Address</Heading>
        <FormContainer>
          <Message messages={formErrors} />
          <PasswordForm onSubmit={this.handleVerifyEmail} />
        </FormContainer>
      </Container>
    );
  }
}


export default EmailVerificationContainer;
