import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';


const globalStyles = () => injectGlobal`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Rokkitt', serif;
  }
`;


export default globalStyles;
