import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { globalStyles } from './styles';
import { EmailVerificationContainer } from './containers';


const App = () => {
  globalStyles();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/verify-email/:key" component={EmailVerificationContainer} />
      </Switch>
    </BrowserRouter>
  );
};


export default App;
