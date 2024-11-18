import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import CartItem from '../components/Cart/CartItem';
import './Cart.css';
import './Shop.css';

const Cart = () => {
  const { cartItems, total, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="shop">
        <div className="subTitle">your cart is empty</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="shop">
        <div className="subTitle">please log in to view your cart</div>
      </div>
    );
  }

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Thank you for your purchase!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="shop">
      <div className="title-section">
        <div className="subTitle" style={{ marginLeft: '-85px' }}>your cart</div>
        <button className="remove-all-button" onClick={clearCart}>
          remove all
        </button>
      </div>
      <div className="cart-page">
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
        <div className="cart-summary">
          <div className="total">
            <span>total:</span>
            <span>${total}</span>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;