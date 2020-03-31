import gql from 'graphql-tag';

export const GET_CART_INFORMATION = gql`
  {
    cart @client {
      items
      total
    }
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation addToCart($productId: String!) {
    addToCart(productId: $productId) @client
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
  mutation increaseOrDecreaseProductQuantity($productId: String!, $value: Int) {
    increaseOrDecreaseProductQuantity(productId: $productId, value: $value) @client
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productId: String!) {
    removeFromCart(productId: $productId) @client
  }
`;

