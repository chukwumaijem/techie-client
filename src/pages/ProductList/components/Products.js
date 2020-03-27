import React from 'react';
import Row from 'react-bootstrap/Row';
import { useQuery } from '@apollo/react-hooks';

import Pagination from './Pagination';
import Product from './Product';
import { GET_PRODUCTS } from '../queries';

const styles = {
  centerHeader: {
    textAlign: 'center',
    margin: '10px'
  }
};

export default () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { pageNumber: 1 }
  });

  if (loading) return 'Loading...';
  if (error) return 'Something went wrong. Please refresh the page.';

  const { total, products } = data.products;

  return (
    <div>
      <h2 style={styles.centerHeader}>Products</h2>
      <Row>
        {products.map(product => (
          <Product product={product} key={product.id} />
        ))}
      </Row>
      <Pagination productLength={total} />
    </div>
  );
};
