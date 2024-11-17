import React from 'react';
import { Container, Typography } from '@mui/material';
import ProductList from '../components/Shop/ProductList';
import './Shop.css';

const Shop = () => {
  return (
    <div className="shop">
      <div className="subTitle">latest designs</div>
      <ProductList />
    </div>
  );
};

export default Shop;

