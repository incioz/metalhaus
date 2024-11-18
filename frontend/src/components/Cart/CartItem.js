import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const isMaxQuantity = item.quantity >= 2;

  return (
    <div className="cart-item">
      <img src={item.productImage} alt={item.productName} />
      <div className="cart-item-details">
        <p>{item.productName}</p>
        <p>${item.price}</p>
        <div className="quantity-controls">
          <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            disabled={isMaxQuantity}
            style={{ opacity: isMaxQuantity ? 0.5 : 1 }}
          >+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
