import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Container,
  CircularProgress,
  InputAdornment,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { Search, AttachMoney } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const GET_PRODUCTS = gql`
  query FilterProducts($category: String, $minPrice: Float, $maxPrice: Float) {
    filterProducts(category: $category, minPrice: $minPrice, maxPrice: $maxPrice) {
      id
      name
      price
      category
    }
  }
`;

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      category: category || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    },
  });

  const filteredProducts = data?.filterProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Product List
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            <TextField
              label="Search products"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{ flexGrow: 1 }}
            />
            <FormControl variant="outlined" sx={{ minWidth: 120, flexGrow: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {['Fruits', 'Dairy', 'Bakery', 'Meat', 'Vegetables', 'Pantry', 'Seafood', 'Grains', 'Snacks', 'Dairy Alternatives', 'Beverages'].map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Min Price"
              type="number"
              variant="outlined"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="Max Price"
              type="number"
              variant="outlined"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />
          </Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">Error: {error.message}</Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map(({ id, name, price, category }) => (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Card
                    component={Link}
                    to={`/product/${id}`}
                    sx={{
                      textDecoration: 'none',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) => theme.shadows[4],
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {name}
                      </Typography>
                      <Typography variant="h5" color="primary" gutterBottom>
                        ${price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ProductList;