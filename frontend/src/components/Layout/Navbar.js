import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

function Navbar() {
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
        <Link to="/login">
          <CiUser className="icons" size={30} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;