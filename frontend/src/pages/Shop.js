import React from 'react';
import { Container, Typography } from '@mui/material';
import ProductList from '../components/Shop/ProductList';

const Shop = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" sx={{ my: 4, textAlign: 'center' }}>
        Our Products
      </Typography>
      <ProductList />
    </Container>
  );
};

export default Shop;

