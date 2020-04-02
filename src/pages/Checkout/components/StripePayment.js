import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

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
export default ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [stripeError, setStripeError] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const billingDetails = {
      name: event.target.name.value,
      email: event.target.email.value,
      address: {
        city: event.target.city.value,
        line1: event.target.address.value,
        state: event.target.state.value,
        postal_code: event.target.zip.value
      }
    };

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails
    });

    if (error) {
      console.log('[error]', error);
      setStripeError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
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
          <CardElement />
        </Form.Group>

        <Button variant="primary" type="submit" style={styles.button}>
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
