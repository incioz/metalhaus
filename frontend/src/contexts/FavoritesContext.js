import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user]);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/favorites/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    }
  };

  const addToFavorites = async (productId) => {
    if (!isAuthenticated) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/favorites',
        {
          userId: user.id,
          productId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      await fetchFavorites();
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!isAuthenticated) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/favorites', {
        data: { userId: user.id, productId },
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchFavorites();
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites,
        isAuthenticated 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};


