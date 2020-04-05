import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { GET_CART_PRODUCTS_DETAILS } from '../queries';
import { GET_CART_INFORMATION } from '../../../store/queries';
import CartItem from '../components/CartItem';

const paymentMethods = ['Stripe'];

const CartPage = () => {
  const { data: cartItems } = useQuery(GET_CART_INFORMATION);
  const productIds = cartItems.cart.items.map(item => item.productId);
  const { loading, error, data } = useQuery(GET_CART_PRODUCTS_DETAILS, {
    variables: {
      productIds
    }
  });

  const cartProducts = get(data, 'cartProducts', []);

  if (!productIds.length) return 'Cart is empty. Get Shopping.';

  if (loading) return 'Loading...';
  if (error) return 'Something went wrong. Please refresh the page.';

  return (
    <Fragment>
      <h4>Cart</h4>
      {cartProducts.map(item => (
        <CartItem item={item} key={item.id} />
      ))}
      {paymentMethods.map(paymentType => (
        <Link
          to={{
            pathname: '/checkout',
            state: { paymentType }
          }}
          key={paymentType}
        >
          <Button>{paymentType}</Button>
        </Link>
      ))}
    </Fragment>
  );
};

export default CartPage;
