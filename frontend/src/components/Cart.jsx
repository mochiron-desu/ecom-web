import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cart.map(item => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)} x ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" align="right" gutterBottom>
            Total: ${total.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Cart;