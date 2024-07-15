import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import { useCart } from './contexts/CartContext';
import styles from './App.module.css';

function App() {
  const { cart } = useCart();

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>EcomStore</Link>
        <div className={styles.cartIcon}>
          <Link to="/cart">🛒 {cart.length}</Link>
        </div>
      </nav>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        © 2024 EcomStore. All rights reserved.
      </footer>
    </div>
  );
}

export default App;