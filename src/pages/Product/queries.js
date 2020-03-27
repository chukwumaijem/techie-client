import gql from 'graphql-tag';
import { PRODUCT_FRAGMENT } from '../../shared/queries';

export const GET_PRODUCT = gql`
  query Product($productId: String!) {
    product(productId: $productId) {
      ...cardProduct
      model
      company
      department
    }
  }
  ${PRODUCT_FRAGMENT}
`;
