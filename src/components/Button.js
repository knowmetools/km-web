import styled from 'styled-components';


const Button = styled.button`
  background: ${props => props.theme.colors.brandPrimary};
  border: 1px solid ${props => props.theme.colors.brandPrimary};
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  cursor: pointer;
  padding: .5em 1em;
  transition: all ease-in-out 200ms;

  &:disabled {
    background: ${props => props.theme.colors.brandPrimaryLight};
    border-color: ${props => props.theme.colors.brandPrimaryLight};
    cursor: not-allowed;
  }

  &:hover {
    background: ${props => props.theme.colors.brandPrimaryLight};
  }
`;


export default Button;
