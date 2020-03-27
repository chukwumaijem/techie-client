import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default () => (
  <Navbar bg="light justify-content-between" expand="lg">
    <Navbar>
      <Navbar.Brand href="/">Techie Market</Navbar.Brand>
      <Link to="/">
        <Nav.Link as="li">Products</Nav.Link>
      </Link>
    </Navbar>
    <Navbar>
      <Link to="/cart">
        <Nav.Link as="li">Cart</Nav.Link>
      </Link>
    </Navbar>
  </Navbar>
);
