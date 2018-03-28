import styled from 'styled-components';


const Label = styled.label`
  display: block;
  font-size: .85em;
  font-weight: bold;
  margin: 1em 0;
  text-transform: uppercase;

  > * {
    font-weight: normal;
    text-transform: none;
  }
`;


export default Label;
