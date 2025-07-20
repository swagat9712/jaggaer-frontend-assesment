import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardMedia, 
  Button, 
  Grid,
  TextField,
  Rating
} from '@mui/material';
import { useProduct, useAddToCart } from '../hooks';
import CommonModal from '../components/CommonModal';
import { ImageModalContent } from '../components/ModalContent';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productData, loading, error } = useProduct(id.split('-')[0]);
  const [addToCart, { loading: addToCartLoading }] = useAddToCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        variables: {
          productId: id.split('-')[0],
          quantity: quantity,
        },
        refetchQueries: ['GetCart', 'GetCartCount'],
        awaitRefetchQueries: true,
      });
      console.log('Product added to cart!');
      navigate(`/`);
    } catch (error) {
      console.log('Error adding to cart: ' + error.message);
    }
  };

  const handleImageClick = () => {
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6">Loading product details...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6" color="error">
            Error loading product: {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!productData?.product) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6">Product not found</Typography>
        </Box>
      </Container>
    );
  }

  const product = productData.product;

  const productImages = product.imageUrl ? [
    product.imageUrl,
    product.imageUrl,
    product.imageUrl
  ] : [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {productImages.map((image, index) => (
              <Card 
                key={index}
                sx={{ 
                  width: 120, 
                  height: 120, 
                  cursor: 'pointer',
                  border: selectedImageIndex === index ? 2 : 1,
                  borderColor: selectedImageIndex === index ? 'primary.main' : 'grey.300',
                  position: 'relative',
                  '&:hover': {
                    borderColor: 'primary.main'
                  }
                }}
                onClick={() => setSelectedImageIndex(index)}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={`${product.name} view ${index + 1}`}
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}
                >
                  🔍
                </Box>
              </Card>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          {product.imageUrl && (
            <Card sx={{ position: 'relative', cursor: 'pointer' }} onClick={handleImageClick}>
              <CardMedia
                component="img"
                image={productImages[selectedImageIndex] || product.imageUrl}
                alt={product.name}
                sx={{ 
                  width: '100%', 
                  height: 400,
                  objectFit: 'cover'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick();
                }}
              >
                🔍
              </Box>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={5}>
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              {product.name}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
              {product.shortDescription}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating 
                value={product.rating} 
                readOnly 
                precision={0.5}
                sx={{ mr: 1 }}
              />
            </Box>
            
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {product.price}.00 EUR
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
              all prices incl. 10% taxes
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1, max: 99 }}
                sx={{ width: 80 }}
                size="small"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
                disabled={addToCartLoading}
                startIcon={<span>🛒</span>}
                sx={{ 
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                ADD TO CART
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: 3
          }}
        >
          DESCRIPTION
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          {product.longDescription || "Meet the smartphone that redefines connectivity. With its advanced camera, powerful processor, and vibrant display, it seamlessly bridges work and leisure. Stay connected with cutting-edge 5G technology and enjoy a sleek design that fits perfectly in your hand."}
        </Typography>
      </Box>

      <CommonModal
        open={imageModalOpen}
        onClose={handleCloseImageModal}
        type="image"
        content={
          <ImageModalContent
            image={productImages[selectedImageIndex] || product.imageUrl}
            alt={product.name}
            productName={product.name}
          />
        }
      />
    </Container>
  );
};

export default ProductDetailPage;
