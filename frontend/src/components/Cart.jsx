import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { jsPDF } from 'jspdf';

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  const generateInvoice = () => {
    const doc = new jsPDF();
    
    // Add company logo or name
    doc.setFontSize(20);
    doc.text('ECOM WEB', 20, 20);
    
    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Invoice Number: INV-${Date.now()}`, 20, 50);
    
    // Add table headers
    doc.setFontSize(14);
    doc.text('Item', 20, 70);
    doc.text('Quantity', 100, 70);
    doc.text('Price', 140, 70);
    doc.text('Total', 180, 70);
    
    // Add table content
    let yPos = 80;
    cart.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(item.name, 20, yPos);
      doc.text(item.quantity.toString(), 100, yPos);
      doc.text(`$${item.price.toFixed(2)}`, 140, yPos);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 180, yPos);
      yPos += 10;
    });
    
    // Add total
    doc.setFontSize(14);
    doc.text(`Total: $${total.toFixed(2)}`, 180, yPos + 20);
    
    // Save the PDF
    doc.save('invoice.pdf');
  };

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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={generateInvoice}>
              Generate Invoice
            </Button>
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