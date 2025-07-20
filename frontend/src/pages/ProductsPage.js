import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProducts, useAddToCart } from '../hooks';

const ProductsPage = () => {
  const navigate = useNavigate();
  const { data: productsData, loading, error } = useProducts();
  const [addToCart, { loading: addToCartLoading }] = useAddToCart();

  const handleProductClick = (productId, productName) => {
    navigate(`/product/${productId}-${productName}`);
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart({
        variables: {
          productId,
          quantity: 1,
        },
        refetchQueries: ['GetCart', 'GetCartCount'],
        awaitRefetchQueries: true,
      });
      console.log('Product added to cart!');
    } catch (error) {
      console.log('Error adding to cart: ' + error.message);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6">Loading products...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6" color="error">
            Error loading products: {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {productsData?.products?.map((product) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={product.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: 2,
                bgcolor: '#fff',
                width: '35vw',
                minWidth: '330px',
                maxWidth: '550px',
                margin: '0 auto',
              }}
            >
              {product.imageUrl && (
                <CardMedia
                  component="img"
                  height="250"
                  image={product.imageUrl}
                  alt={product.name}
                  sx={{ 
                    cursor: 'pointer',
                    objectFit: 'cover',
                    padding: 2
                  }}
                  onClick={() => handleProductClick(product.id, product.name)}
                />
              )}
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                  onClick={() => handleProductClick(product.id, product.name)}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {product.shortDescription}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {[...Array(5)].map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        color: index < product.rating ? '#ffa726' : '#e0e0e0',
                        fontSize: '20px',
                        mr: 0.5
                      }}
                    >
                      ★
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <Button
                    variant="outlined"
                    sx={{ 
                      flex: 1,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      '&:hover': {
                        borderColor: '#1565c0',
                        backgroundColor: 'rgba(25, 118, 210, 0.04)'
                      }
                    }}
                    onClick={() => handleProductClick(product.id, product.name)}
                  >
                    Show Details
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ 
                      flex: 1,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      bgcolor: '#1976d2',
                      '&:hover': {
                        bgcolor: '#1565c0'
                      }
                    }}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addToCartLoading}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
