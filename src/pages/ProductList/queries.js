import gql from 'graphql-tag';
import { PRODUCT_FRAGMENT } from '../../shared/queries';

export const GET_CAROUSELS = gql`
  {
    carousels {
      id
      title
      description
      imageUrl
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products($pageNumber: Float!) {
    products(pageNumber: $pageNumber) {
      products {
        ...cardProduct
        description
      }
      total
    }
  }
  ${PRODUCT_FRAGMENT}
`;
