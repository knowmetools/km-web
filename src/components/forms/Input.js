import styled from 'styled-components';


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


export default Input;
