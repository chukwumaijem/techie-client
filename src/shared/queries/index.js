import gql from 'graphql-tag';

export const PRODUCT_FRAGMENT = gql`
  fragment cardProduct on Product {
    id
    name
    price
    imageUrl
  }
`;
