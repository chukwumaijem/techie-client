import gql from 'graphql-tag';

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
