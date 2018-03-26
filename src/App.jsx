import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'

import { globalStyles, theme } from './styles';
import { EmailVerificationContainer } from './containers';


const App = () => {
  globalStyles();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/verify-email/:key" component={EmailVerificationContainer} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};


export default App;
