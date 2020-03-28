import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const styles = {
  cartItem: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cartImage: {
    width: '150px'
  },
  twoLine: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
};

const CartPage = ({ item }) => {
  return (
    <Card style={styles.cartItem}>
      <img src={item.imageUrl} alt={item.name} style={styles.cartImage} />
      <div style={styles.twoLine}>
        Maker: {item.company}
        <h6>{item.name}</h6>
      </div>
      <div style={styles.twoLine}>
        <p>Unit Price: {item.price}</p>
        <p>Total Price: {item.price}</p>
      </div>
      <Button variant="danger" size="sm" style={{ height: '50px' }}>
        Remove
      </Button>
    </Card>
  );
};

export default CartPage;
