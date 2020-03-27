import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom';

import NavBar from './shared/components/Navbar/Navbar';
import ProductPage from './pages/ProductList/containers/ProductList';
import ProductDetailPage from './pages/Product/ProductDetail';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container>
        <Switch>
          <Route path="/" exact component={ProductPage} />
          <Route path="/products/:id" exact component={ProductDetailPage} />
          <Route path="*" exact component={() => '404'} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;