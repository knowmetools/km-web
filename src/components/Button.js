import styled from 'styled-components';


const Button = styled.button`
  background: ${props => props.theme.colors.brandPrimary};
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  cursor: pointer;
  padding: .5em 1em;
  transition: all ease-in-out 200ms

  &:hover {
    background: ${props => props.theme.colors.brandPrimaryLight};
  }
`;


export default Button;
