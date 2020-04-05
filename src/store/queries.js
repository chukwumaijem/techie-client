import gql from 'graphql-tag';

export const GET_CART_INFORMATION = gql`
  {
    cart @client {
      items
      total
      totalAmount
    }
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation addToCart($productId: String!, $price: Float) {
    addToCart(productId: $productId, price: $price) @client
  }
`;

export const IS_PRODUCT_IN_CART = gql`
  query InCart($productId: String!) {
    isInCart(productId: $productId) @client {
      found
    }
  }
`;

export const GET_PRODUCT_QUANTITY = gql`
  query Quantity($productId: String!) {
    quantity(productId: $productId) @client
  }
`;

export const CHANGE_PRODUCT_QUANTITY = gql`
  mutation increaseOrDecreaseProductQuantity(
    $productId: String!
    $value: Int
    $price: Float
  ) {
    increaseOrDecreaseProductQuantity(
      productId: $productId
      value: $value
      price: $price
    ) @client
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productId: String!) {
    removeFromCart(productId: $productId) @client
  }
`;

export const GET_CART_TOTAL_AMOUNT = gql`
  {
    cartTotalAmount @client
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  query createPaymentIntent($amount: Int!) {
    createPaymentIntent(amount: $amount) {
      success
      message
      clientSecret
    }
  }
`;
