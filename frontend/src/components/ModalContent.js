import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ImageModalContent = ({ image, alt, productName }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      maxWidth: '100%',
      maxHeight: '100%',
    }}>
      <img
        src={image}
        alt={alt || productName}
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
          objectFit: 'contain',
          borderRadius: 8,
        }}
      />
    </Box>
  );
};

export const PurchaseCompleteContent = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    if (onClose) onClose();
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'success.main' }}>
        Purchase Complete
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
        Thank you for your purchase! Your order has been successfully placed. 
        A confirmation email has been sent to your inbox with the details of your order. 
        We hope to serve you again soon!
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ px: 4, py: 1.5 }}
        >
          GO BACK HOME
        </Button>
      </Box>
    </Box>
  );
};
