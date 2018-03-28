import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Message, PageHeader, PasswordForm } from '../components';
import { Container } from '../containers';
import { Account } from '../services';


const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 25em;
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
          } else if (response.status >= 500 && response.status < 600) {
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
    let content;
    if (this.state.isComplete) {
      content = (
        <Container>
          <PageHeader>Email Verified</PageHeader>
          <p style={{ textAlign: 'center' }}>Your email address has been successfully verified.</p>
        </Container>
      );
    } else {
      const { keyErrors, nonFieldErrors } = this.state;
      const formErrors = [...nonFieldErrors, ...keyErrors];

      content = (
        <Container>
          <PageHeader>Verify your Email Address</PageHeader>
          <FormContainer>
            <Message messages={formErrors} />
            <PasswordForm onSubmit={this.handleVerifyEmail} />
          </FormContainer>
        </Container>
      );
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Verify your Email</title>
        </Helmet>
        {content}
      </React.Fragment>
    );
  }
}


export default EmailVerificationContainer;
