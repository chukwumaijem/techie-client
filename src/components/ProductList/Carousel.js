import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useQuery } from '@apollo/react-hooks';

import { GET_CAROUSELS } from './queries';

const styles = {
  carouselText: {
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  carouselDescription: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden'
  }
};

export default () => {
  const { loading, error, data } = useQuery(GET_CAROUSELS);
  if (loading) return 'Loading...';
  if (error) return 'Something went wrong. Please refresh the page.';
  const { carousels = [] } = data;

  return (
    <Carousel>
      {carousels.map(item => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block h-60 w-100"
            src={item.imageUrl}
            alt="First slide"
            crossOrigin="anonymous"
          />
          <Carousel.Caption>
            <div style={styles.carouselText}>
              <h3>{item.title}</h3>
              <p style={styles.carouselDescription}>{item.description}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
