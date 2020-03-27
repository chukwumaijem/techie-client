import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';

const styles = {
  cardTitle: {
    fontSize: '14px',
    color: '#000000'
  },
  description: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    fontSize: '12px'
  },
  card: {
    height: '350px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#666',
    textDecoration: 'none',
    margin: '10px'
  },
  cardImage: {
    width: '230px',
    maxHeight: '200px',
    alignSelf: 'center'
  },
  cardBody: {
    alignSelf: 'center'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

export default ({ product }) => (
  <Col xs={12} sm={6} md={3}>
    <Link to={`/products/${product.id}`}>
      <Card style={styles.card}>
        <Card.Img
          variant="top"
          src={product.imageUrl}
          style={styles.cardImage}
        />
        <Card.Body style={styles.cardBody}>
          <Card.Title style={styles.cardTitle}>{product.name}</Card.Title>
          <Card.Text style={styles.description}>
            {product.description}
          </Card.Text>
          <div style={styles.cardFooter}>
            <Button variant="primary" size="sm">
              Add to Cart
            </Button>
            <Badge pill variant="light" size="md" style={styles.cardTitle}>
              ${product.price}
            </Badge>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Col>
);
