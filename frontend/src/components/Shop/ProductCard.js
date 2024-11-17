import React, { useContext } from 'react';
import './ProductCard.css';
import { CartContext } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const cartContext = useContext(CartContext);
  
  if (!cartContext) {
    return null;
  }

  const { addToCart } = cartContext;

  return (
    <div className="product">
      <img src={product.productImage || 'https://via.placeholder.com/350'} alt={product.productName} />
      <div className="description">
        <h3>{product.productName}</h3>
        <p>${product.price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(product)}>
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;

