import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const styles = {
  carouselText: {
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  carouselDescription: {
    lineClamp: '2'
  }
};

export default () => {
  const carousel = [];

  return (
    <Carousel>
      {carousel.map((item, index) => (
        <Carousel.Item key={`carousel-${index}`}>
          <img
            className="d-block h-60 w-100"
            src={item.image_url}
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
