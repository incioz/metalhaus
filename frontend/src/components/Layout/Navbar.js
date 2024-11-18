import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import './Navbar.css';
import { CiHeart, CiShoppingCart, CiUser, CiLogout } from "react-icons/ci";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">METALHAUS</Link>
      </div>
      <div className="links">
        <Link to="/favorites">
          <CiHeart className="icons" size={30} />
        </Link>
        <Link to="/cart" className="cart-icon">
          <CiShoppingCart className="icons" size={30} />
          {isAuthenticated && cartQuantity > 0 && (
            <span className="cart-badge">{cartQuantity}</span>
          )}
        </Link>
        <button onClick={handleAuthClick} className="auth-icon-button">
          {isAuthenticated ? 
            <CiLogout className="icons" size={30} /> :
            <CiUser className="icons" size={30} />
          }
        </button>
      </div>
    </nav>
  );
}

export default Navbar;