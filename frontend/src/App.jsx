import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import { useCart } from './contexts/CartContext';

function App() {
  const { cart } = useCart();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            EcomStore
          </Typography>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;