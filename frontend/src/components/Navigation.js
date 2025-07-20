import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
} from '@mui/material';
import { Home, ShoppingCart, Inventory } from '@mui/icons-material';
import { useCartCount } from '../hooks';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: cartCountData } = useCartCount();

  const isActive = (path) => location.pathname === path;
  const getHeaderText = () => {
    switch (location.pathname) {
      case '/':
        return 'Products';
      case '/cart':
        return 'Cart';
      default:
        if (location.pathname.startsWith('/product/')) {
          return location.pathname.split('-')[1] || 'Product Details';
        }
        return 'E-Commerce Store';
    }
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          {getHeaderText()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{
              backgroundColor: isActive('/cart') ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            <Badge badgeContent={cartCountData?.cartCount || 0} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
