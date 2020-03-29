import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';

import { GET_PRODUCT_QUANTITY } from '../../store/queries';

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
    width: '10%'
  }
};

const CartPage = ({ item }) => {
  const { data } = useQuery(GET_PRODUCT_QUANTITY, {
    variables: {
      productId: item.id
    }
  });

  const quantity = get(data, 'quantity', 1);

  return (
    <Card style={styles.cartItem}>
      <img src={item.imageUrl} alt={item.name} style={styles.cartImage} />
      <div style={{ ...styles.twoLine, ...styles.itemInfoContainer }}>
        Maker: {item.company}
        <h6>{item.name}</h6>
      </div>
      <div style={styles.quantiyButtonsContainer}>
        <Button size="sm" variant="secondary" style={styles.quantiyButtons}>
          -
        </Button>
        {quantity}
        <Button size="sm" variant="secondary" style={styles.quantiyButtons}>
          +
        </Button>
      </div>
      <div style={{ ...styles.twoLine, ...styles.priceContainer }}>
        <p>Unit Price: {item.price}</p>
        <p>Total Price: {item.price * quantity}</p>
      </div>
      <Button variant="danger" size="sm" style={{ height: '50px' }}>
        Remove
      </Button>
    </Card>
  );
};

export default CartPage;
