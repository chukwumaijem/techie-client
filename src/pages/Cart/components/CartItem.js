import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useQuery, useMutation } from '@apollo/react-hooks';
import get from 'lodash/get';

import {
  GET_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_QUANTITY,
  REMOVE_FROM_CART
} from '../../../store/queries';

const styles = {
  cartItem: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cartImage: {
    width: '15%'
  },
  twoLine: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemInfoContainer: {
    width: '30%'
  },
  quantiyButtons: {
    margin: '10px'
  },
  quantiyButtonsContainer: {
    width: '10%'
  },
  priceContainer: {
    width: '15%'
  }
};

const CartPage = ({ item }) => {
  const { data, refetch } = useQuery(GET_PRODUCT_QUANTITY, {
    variables: {
      productId: item.id
    }
  });

  const [changeProductQuantity] = useMutation(CHANGE_PRODUCT_QUANTITY);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const quantity = get(data, 'quantity', 1);

  const handleAddOrMinusClick = e => {
    const { innerHTML } = e.target;
    e.preventDefault();
    changeProductQuantity({
      variables: {
        productId: item.id,
        value: Number(`${innerHTML}1`),
        price: item.price,
      }
    });
    refetch();
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    removeFromCart({
      variables: {
        productId: item.id,
        price: item.price,
      }
    });
  }

  return (
    <Card style={styles.cartItem}>
      <img src={item.imageUrl} alt={item.name} style={styles.cartImage} />
      <div style={{ ...styles.twoLine, ...styles.itemInfoContainer }}>
        Maker: {item.company}
        <h6>{item.name}</h6>
      </div>
      <div style={styles.quantiyButtonsContainer}>
        <Button
          size="sm"
          variant="secondary"
          style={styles.quantiyButtons}
          onClick={handleAddOrMinusClick}
          disabled={quantity === 1}
        >
          -
        </Button>
        {quantity}
        <Button
          size="sm"
          variant="secondary"
          style={styles.quantiyButtons}
          onClick={handleAddOrMinusClick}
        >
          +
        </Button>
      </div>
      <div style={{ ...styles.twoLine, ...styles.priceContainer }}>
        <p>Unit Price: ${item.price}</p>
        <p>Total Price: ${item.price * quantity}</p>
      </div>
      <Button variant="danger" size="sm" style={{ height: '50px' }} onClick={handleRemoveFromCart}>
        Remove
      </Button>
    </Card>
  );
};

export default CartPage;
