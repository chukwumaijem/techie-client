import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { GET_CART_INFORMATION } from '../../../store/queries';

const styles = {
  cartItemCount: {
    color: '#000000',
  },
  linkStyle: {
    textDecoration: 'none',
  }
};

export default () => {
  const { data } = useQuery(GET_CART_INFORMATION);
  const { total } = data.cart;
  return (
    <Navbar bg="light justify-content-between" expand="lg">
      <Navbar>
        <Navbar.Brand href="/">Techie Market</Navbar.Brand>
        <Link to="/">
          <Nav.Link as="li">Products</Nav.Link>
        </Link>
      </Navbar>
      <Navbar>
        <Link to="/cart" style={styles.linkStyle}>
          <Nav.Link as="li">
            Cart <span style={styles.cartItemCount}>({total})</span>
          </Nav.Link>
        </Link>
      </Navbar>
    </Navbar>
  );
};
