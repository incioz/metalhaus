import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          Shop
        </Typography>
        <Button color="inherit" component={Link} to="/favorites">
          <Favorite />
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </Button>
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>Logout</Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;