import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import get from 'lodash/get';

import { GET_PRODUCT } from './queries';
import { IS_PRODUCT_IN_CART, ADD_PRODUCT_TO_CART } from '../../store/queries';

const styles = {
  cardBody: {
    flexDirection: 'row',
    height: '550px'
  },
  cardBodyContent: {
    width: 'auto',
    height: '500px'
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
};

export default withRouter(({ match }) => {
  const { id: productId } = match.params;
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { productId }
  });
  const { data: isInCart, refetch } = useQuery(IS_PRODUCT_IN_CART, {
    variables: {
      productId
    }
  });
  const found = get(isInCart, 'isInCart.found', false);
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);

  if (loading) return 'Loading...';
  if (error) return 'Something went wrong. Please refresh the page.';
  const { product } = data;

  const handleAddToCart = e => {
    e.preventDefault();
    addProductToCart({
      variables: {
        productId: product.id,
        price: product.price
      }
    });
    refetch();
  };

  return (
    <Fragment>
      <Card style={styles.cardBody} border="light">
        <Card.Img src={product.imageUrl} style={styles.cardBodyContent} />
        <Card.Body style={{ ...styles.cardBodyContent, ...styles.cardText }}>
          <Card.Title>{product.name}</Card.Title>
          <Card.Title>Model: {product.model}</Card.Title>
          <Card.Title>Maker: {product.company}</Card.Title>
          <Card.Title>Department: {product.department}</Card.Title>
          <Card.Title>${product.price}</Card.Title>
          <Button variant="primary" disabled={found} onClick={handleAddToCart}>
            {found ? 'In Cart' : 'Add to Cart'}
          </Button>
        </Card.Body>
      </Card>
      <div>
        <h4>Description</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: product.description
          }}
        />
      </div>
    </Fragment>
  );
});
