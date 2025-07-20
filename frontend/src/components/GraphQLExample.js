import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  useProducts,
  useProduct,
  useCart,
  useAddToCart,
  useRemoveFromCart,
  useClearCart,
} from '../hooks';

const GraphQLExample = () => {
  const [selectedProductId, setSelectedProductId] = useState('');

  const { data: productsData, loading: productsLoading } = useProducts();
  const { data: productData, loading: productLoading } = useProduct(selectedProductId);
  const { data: cartData, loading: cartLoading } = useCart();

  const [addToCart, { loading: addToCartLoading }] = useAddToCart();
  const [removeFromCart, { loading: removeFromCartLoading }] = useRemoveFromCart();
  const [clearCart, { loading: clearCartLoading }] = useClearCart();

  const handleAddToCart = async (productId) => {
    try {
      await addToCart({
        variables: {
          productId,
          quantity: 1,
        },
      });
      console.log('Product added to cart!');
    } catch (error) {
      console.log('Error adding to cart: ' + error.message);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart({
        variables: { itemId },
      });
      console.log('Item removed from cart!');
    } catch (error) {
      console.log('Error removing from cart: ' + error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      console.log('Cart cleared!');
    } catch (error) {
      console.log('Error clearing cart: ' + error.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        GraphQL Operations Example
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            All Products
          </Typography>
          {productsLoading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {productsData?.products?.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.shortDescription}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddToCart(product.id)}
                        disabled={addToCartLoading}
                        sx={{ mt: 1 }}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Single Product Query
          </Typography>
          <TextField
            label="Product ID"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            placeholder="Enter product ID (e.g., 1, 2, 3, 4)"
            sx={{ mb: 2 }}
          />
          {productLoading && <CircularProgress />}
          {productData?.product && (
            <Alert severity="success">
              <Typography variant="h6">{productData.product.name}</Typography>
              <Typography>{productData.product.longDescription}</Typography>
              <Typography>Price: ${productData.product.price}</Typography>
              <Typography>Rating: {productData.product.rating}/5</Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Shopping Cart
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearCart}
            disabled={clearCartLoading}
            sx={{ mb: 2 }}
          >
            Clear Cart
          </Button>
          {cartLoading ? (
            <CircularProgress />
          ) : (
            <Box>
              <Typography variant="h6">
                Total Items: {cartData?.cart?.count || 0}
              </Typography>
              <Typography variant="h6">
                Total Price: ${cartData?.cart?.total || 0}
              </Typography>
              {cartData?.cart?.items?.map((item) => (
                <Card key={item.id} variant="outlined" sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                    <Typography>Price: ${item.product.price}</Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveFromCart(item.id)}
                      disabled={removeFromCartLoading}
                      sx={{ mt: 1 }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default GraphQLExample;
