import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App.jsx'
import client from './apollo-client'
import { CartProvider } from './contexts/CartContext'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <CartProvider>
            <App />
          </CartProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)