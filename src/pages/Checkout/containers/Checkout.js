import React, { Fragment } from 'react';
import StripePayment from '../components/StripePayment';
import { withRouter, Redirect } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';

import { GET_CART_TOTAL_AMOUNT } from '../../../store/queries';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = withRouter(({ location }) => {
  const { paymentType } = location.state;
  if (!paymentType) return <Redirect to="/cart" />;

  const { data, loading } = useQuery(GET_CART_TOTAL_AMOUNT, {
    fetchPolicy: 'no-cache'
  });
  if (loading) return 'Loading data...';
  const cartTotalAmount = get(data, 'cartTotalAmount', 0);

  return (
    <Fragment>
      {paymentType === 'Stripe' && (
        <Elements stripe={stripePromise}>
          <StripePayment amount={cartTotalAmount} />
        </Elements>
      )}
    </Fragment>
  );
});

export default Checkout;
