import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useCart } from '../contexts/CartContext';
import styles from './ProductDetails.module.css';

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      category
    }
  }
`;

function ProductDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });
  const { addToCart } = useCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { name, description, price, category } = data.product;

  return (
    <div className={styles.productDetails}>
      <Link to="/" className={styles.backLink}>&larr; Back to Products</Link>
      <h2>{name}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>${price.toFixed(2)}</p>
      <p className={styles.category}>Category: {category}</p>
      <button className={styles.addToCart} onClick={() => addToCart(data.product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;