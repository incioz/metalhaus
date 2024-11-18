import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    
    if (existingItem) {
      if (existingItem.quantity >= 2) {
        alert('Maximum quantity of 2 items per product');
        return;
      }
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: Math.min(item.quantity + 1, 2) }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 0 || newQuantity > 2) return;
    
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item._id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    const newTotal = cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    setTotal(Number(newTotal.toFixed(2)));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
