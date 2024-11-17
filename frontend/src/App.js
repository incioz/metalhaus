import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;