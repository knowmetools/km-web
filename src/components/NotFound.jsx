import React from 'react';
import { Helmet } from 'react-helmet';

import { Container } from '../containers';
import { PageHeader } from './';


const NotFound = () => (
  <React.Fragment>
    <Helmet>
      <title>Page Not Found</title>
    </Helmet>

    <Container>
      <PageHeader>Page Not Found</PageHeader>
      <p style={{ textAlign: 'center' }}>
        This page does not exist (yet). If you believe it should, feel free to <a href="mailto:team@knowmetools.com" rel="noopener noreferrer" target="_blank">contact us</a>.
      </p>
    </Container>
  </React.Fragment>
);


export default NotFound;
