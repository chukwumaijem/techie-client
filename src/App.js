import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/Navbar/Navbar';
import ProductPage from './pages/index';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container>
        <Switch>
          <Route path="/" exact component={ProductPage} />
          <Route path="*" exact component={() => '404'} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
