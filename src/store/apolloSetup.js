import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import { resolvers } from './resolver';

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: process.env.REACT_APP_SERVER_PATH
  })
]);

const cache = new InMemoryCache();

cache.writeData({
  data: {
    cart: {
      items: [],
      total: 0,
      totalAmount: 0,
      __typename: 'CART_INFORMATION'
    }
  }
});

export default new ApolloClient({
  link,
  cache,
  resolvers
});
