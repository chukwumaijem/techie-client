import gql from 'graphql-tag';
import { PRODUCT_FRAGMENT } from '../../shared/queries';

export const GET_CART_PRODUCTS_DETAILS = gql`
  query productDetails($productIds: [String]) {
    cartProducts(productIds: $productIds) {
      ...cardProduct
    }
  }
  ${PRODUCT_FRAGMENT}
`;
