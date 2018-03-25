import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';


const globalStyles = () => injectGlobal`
  ${reset}
`;


export default globalStyles;
