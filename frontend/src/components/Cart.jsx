import React from 'react';
import { useCart } from '../contexts/CartContext';
import styles from './Cart.module.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <div className={styles.cart}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className={styles.quantityInput}
              />
              <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>Remove</button>
            </div>
          ))}
          <div className={styles.total}>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;