import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useCart } from '../contexts/CartContext';
import { Typography, Button, Box, Paper } from '@mui/material';

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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const { name, description, price, category } = data.product;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Button component={Link} to="/" sx={{ mb: 2 }}>
        Back to Products
      </Button>
      <Typography variant="h4" gutterBottom>{name}</Typography>
      <Typography variant="body1" paragraph>{description}</Typography>
      <Typography variant="h6" gutterBottom>${price.toFixed(2)}</Typography>
      <Typography variant="subtitle1" gutterBottom>Category: {category}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => addToCart(data.product)}
        >
          Add to Cart
        </Button>
      </Box>
    </Paper>
  );
}

export default ProductDetails;