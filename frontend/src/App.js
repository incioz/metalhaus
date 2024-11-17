import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;