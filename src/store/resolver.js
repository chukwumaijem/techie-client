import { GET_CART_INFORMATION } from './queries';

export const resolvers = {
  Mutation: {
    addToCart: (_, product, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART_INFORMATION });
      const { items, total } = cart;
      const { productId } = product;
      cache.writeQuery({
        query: GET_CART_INFORMATION,
        data: {
          cart: {
            items: [
              ...items,
              {
                productId,
                quantity: 1
              }
            ],
            total: total + 1,
            __typename: 'CART_INFORMATION'
          }
        }
      });
      return null;
    }
  },
  Query: {
    cart: (_, _args, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART_INFORMATION });

      return cart;
    },
    isInCart: (_, { productId }, { cache }) => {
      let found = false;
      const { cart } = cache.readQuery({ query: GET_CART_INFORMATION });
      if (cart.items.find(item => item.productId === productId)) found = true;

      return {
        found,
        __typename: `product_${productId}`
      };
    },
    quantity: (_, { productId }, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART_INFORMATION });
      const product = cart.items.find(item => (item.productId === productId));

      return product.quantity;
    }
  }
};
