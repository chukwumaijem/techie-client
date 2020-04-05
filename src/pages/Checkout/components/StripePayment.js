import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import { useLazyQuery } from '@apollo/react-hooks';

import { CREATE_PAYMENT_INTENT } from '../../../store/queries';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  form: {
    width: '500px'
  },
  button: {
    marginTop: '20px',
    width: 'inherit'
  },
  error: {
    display: 'block',
    opacity: 1,
    width: 'inherit',
    height: 'fit-content',
    background: 'red',
    fontSize: '14px',
    color: 'white',
    margin: '20px'
  }
};

const stripeOptions = {
  hidePostalCode: true
};

export default ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  let billingDetails = {};
  const [createPaymentIntent] = useLazyQuery(CREATE_PAYMENT_INTENT, {
    onCompleted: async ({ createPaymentIntent }) => {
      const cardElement = elements.getElement(CardElement);
      try {
        const {
          paymentMethod,
          error: paymentMethodError
        } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: billingDetails
        });
        if (paymentMethodError) throw new Error(paymentMethodError.message);

        const {
          paymentIntent,
          error: paymentIntentError
        } = await stripe.confirmCardPayment(createPaymentIntent.clientSecret, {
          payment_method: paymentMethod.id
        });

        if (paymentIntentError) throw new Error(paymentIntentError.message);
        console.log('[paymentIntent]', paymentIntent);
      } catch (error) {
        setStripeError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const [stripeError, setStripeError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setIsSubmitting(true);
    billingDetails = {
      name: event.target.name.value,
      email: event.target.email.value,
      address: {
        city: event.target.city.value,
        line1: event.target.address.value,
        state: event.target.state.value,
        postal_code: event.target.zip.value
      }
    };

    createPaymentIntent({
      variables: {
        amount: amount * 100
      }
    });
  };

  return (
    <div style={styles.container}>
      <Form onSubmit={handleSubmit} style={styles.form}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" name="name" required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" name="address" required />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control name="state" required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control name="zip" required />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCardDetails">
          <Form.Label>Card Details</Form.Label>
          <CardElement options={stripeOptions} />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={styles.button}
          disabled={isSubmitting || !stripe || !elements}
        >
          Pay ${amount}
        </Button>

        {stripeError && (
          <Toast
            delay={3000}
            autohide
            onClose={() => setStripeError(false)}
            style={styles.error}
          >
            <Toast.Body>{stripeError}</Toast.Body>
          </Toast>
        )}
      </Form>
    </div>
  );
};
