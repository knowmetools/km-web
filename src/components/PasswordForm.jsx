import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { Button } from './';


const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 25em;
`;


const Input = styled.input`
  border: 1px solid ${props => props.theme.colors.grayAccent};
  border-radius: ${props => props.theme.borderRadius};
  display: block;
  margin: .75em 0;
  padding: .25em;
  transition: all ease-in-out 200ms
  width: 100%;

  &:focus {
    box-shadow: 0 0 2pt 1pt ${props => props.theme.colors.brandPrimary};
    margin: .5em 0;
    padding: .5em;
  }
`;


const Label = styled.label`
  display: block;
  font-size: .85em;
  font-weight: bold;
  text-transform: uppercase;
`;


/**
 * Form for prompting the user for their password.
 */
class PasswordForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    password: '',
  };

  /**
   * Event Handlers
   */

  handlePasswordChange = e => this.setState({ password: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.password);
  }

  /**
   * Component Methods
   */

  render() {
    return (
      <FormContainer>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="current-password"
            autoFocus
            id="password"
            name="password"
            onChange={this.handlePasswordChange}
            required
            type="password"
            value={this.state.password}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormContainer>
    );
  }
}


export default PasswordForm;
