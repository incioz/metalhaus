import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { AuthContext } from '../contexts/AuthContext';
import ProductCard from '../components/Shop/ProductCard';
import './Shop.css';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <div className="shop">
        <div className="subTitle">please log in to view your favorites</div>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="subTitle">my favorites</div>
      <div className="products">
        {favorites.map(product => (
          <ProductCard key={product._id} product={product} showFavoriteButton={true} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;