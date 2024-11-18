import React, { useContext } from 'react';
import './ProductCard.css';
import { CartContext } from '../../contexts/CartContext';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { AuthContext } from '../../contexts/AuthContext';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useContext(CartContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { isAuthenticated } = useContext(AuthContext);

  const isFavorite = favorites.some(fav => fav._id === product._id);
  const cartItem = cartItems.find(item => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isMaxQuantity = quantity >= 2;

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      alert('Please log in to add favorites');
      return;
    }
    
    if (isFavorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product._id);
    }
  };

  return (
    <div className="product">
      <img src={product.productImage || 'https://via.placeholder.com/350'} alt={product.productName} />
      <div className="description">
        <p>{product.productName}</p>
        <p>${product.price}</p>
        {isAuthenticated && (
          <div className="buttons">
            <div className="cart-controls">
              {quantity > 0 ? (
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(product._id, quantity - 1)}>-</button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    disabled={isMaxQuantity}
                  >+</button>
                </div>
              ) : (
                <button 
                  className="addToCartBttn" 
                  onClick={() => addToCart(product)}
                >
                  add to cart
                </button>
              )}
            </div>
            <button className="favoriteBtn" onClick={handleFavoriteClick}>
              {isFavorite ? <FaHeart color="red" /> : <CiHeart />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

