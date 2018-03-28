import styled from 'styled-components';


const PageHeader = styled.h1`
  color: ${props => props.theme.colors.brandPrimary};
  font-size: ${props => props.theme.fonts.sizes.headings[1]};
  line-height: 1.25em;
  margin: .5em 0;
  text-align: center;
`;


export default PageHeader;
