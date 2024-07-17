import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Badge, IconButton, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import { useCart } from './contexts/CartContext';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            EcomStore
          </Typography>
          {user ? (
            <>
              <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
                Welcome, {user.username}!
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          )}
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;