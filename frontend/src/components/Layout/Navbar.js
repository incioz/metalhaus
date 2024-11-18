import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';
import { CiHeart, CiShoppingCart, CiUser, CiLogout } from "react-icons/ci";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <Link to="/cart">
          <CiShoppingCart className="icons" size={30} />
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