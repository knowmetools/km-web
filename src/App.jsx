import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { EmailVerificationContainer } from './containers';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/verify-email/:key" component={EmailVerificationContainer} />
    </Switch>
  </BrowserRouter>
);


export default App;
