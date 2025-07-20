import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import Navigation from './components/Navigation';
import { ProductsPage, ProductDetailPage, CartPage } from './pages';
import GraphQLExample from './components/GraphQLExample';
import './App.css';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/example" element={<GraphQLExample />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
