import React, { useContext } from 'react';
import './ProductCard.css';
import { CartContext } from '../../contexts/CartContext';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { AuthContext } from '../../contexts/AuthContext';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { isAuthenticated } = useContext(AuthContext);

  const isFavorite = favorites.some(fav => fav._id === product._id);

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
        <h3>{product.productName}</h3>
        <p>${product.price}</p>
        <div className="buttons">
          <button className="addToCartBttn" onClick={() => addToCart(product)}>
            add to cart
          </button>
          <button className="favoriteBtn" onClick={handleFavoriteClick}>
            {isFavorite ? <FaHeart color="red" /> : <CiHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

