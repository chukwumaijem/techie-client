import { GET_CART_INFORMATION } from './queries';

export const resolvers = {
  Mutation: {
    addToCart: (_, product, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART_INFORMATION });
      const { items, total, totalAmount } = cart;
      const { productId, price } = product;
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
            totalAmount: totalAmount + price,
            __typename: 'CART_INFORMATION'
          }
        }
      });
      return null;
    },
    increaseOrDecreaseProductQuantity: (
      _,
      { productId, value, price },
      { cache }
    ) => {
      const { cart } = cache.readQuery({ query: GET_CART_INFORMATION });
      const { total, items, totalAmount } = cart;
      const productIndex = items.findIndex(
        item => item.productId === productId
      );
      const cartItems = [
        ...items.slice(0, productIndex),
        {
          productId: items[productIndex].productId,
          quantity: items[productIndex].quantity + value
        },
        ...items.slice(productIndex + 1)
      ];
      cache.writeQuery({
        query: GET_CART_INFORMATION,
        data: {
          cart: {
            items: cartItems,
            total: total + value,
            totalAmount: totalAmount + price,
            __typename: 'CART_INFORMATION'
          }
        }
      });
      return null;
    },
    removeFromCart: (_, { productId, price }, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART_INFORMATION });
      const { total, items, totalAmount } = cart;
      const productIndex = items.findIndex(
        item => item.productId === productId
      );
      const [removedProduct] = items.splice(productIndex, 1);
      cache.writeQuery({
        query: GET_CART_INFORMATION,
        data: {
          cart: {
            items,
            total: total - removedProduct.quantity,
            totalAmount: totalAmount + removedProduct.quantity * price,
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
      const product = cart.items.find(item => item.productId === productId);

      return product.quantity;
    },
    cartTotalAmount: (_, product, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART_INFORMATION });

      return cart.totalAmount;
    }
  }
};
