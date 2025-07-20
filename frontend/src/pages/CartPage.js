import React, { useState, useEffect, useRef, use } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Button,
  IconButton,
} from "@mui/material";
import { Delete, ShoppingCartCheckout } from "@mui/icons-material";
import { useCart, useRemoveFromCart, useClearCart } from "../hooks";
import CommonModal from "../components/CommonModal";
import { PurchaseCompleteContent } from "../components/ModalContent";

const CartPage = () => {
  const { data: cartData, loading, error, refetch } = useCart();
  const timeoutRef = useRef(null);
  const [removeFromCart, { loading: removeLoading }] = useRemoveFromCart();
  const [clearCart, { loading: clearLoading }] = useClearCart();
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  useEffect(() => {
      refetch()
  }, [cartData]);

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart({
        variables: { itemId },
        refetchQueries: ["GetCart", "GetCartCount"],
        awaitRefetchQueries: true,
      });
    } catch (error) {
      console.log("Error removing item: " + error.message);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCart({
          refetchQueries: ["GetCart", "GetCartCount"],
          awaitRefetchQueries: true,
        });
      } catch (error) {
        console.log("Error clearing cart: " + error.message);
      }
    }
  };

  const handleProceedToCheckout = () => {
    setPurchaseModalOpen(true);
  };

  const handleClosePurchaseModal = () => {
    setPurchaseModalOpen(false);
  };

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Typography variant="h6">Loading cart...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Typography variant="h6" color="error">
            Error loading cart: {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  const cart = cartData?.cart;
  const isEmpty = !cart?.items || cart.items.length === 0;

  if (isEmpty) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Shopping Cart
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ py: 8 }}
        >
          <ShoppingCartCheckout
            sx={{ fontSize: 100, color: "grey.300", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Add some products to get started!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" component="h1">
          Cart
        </Typography>
        <Button
          variant="text"
          color="inherit"
          onClick={handleClearCart}
          disabled={clearLoading}
          sx={{ color: "text.secondary" }}
        >
          Clear the cart
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        {cart.items.map((item) => (
          <Card key={item.id} sx={{ mb: 3, p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.product.shortDescription ||
                    "High-end smartphone with great camera"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
              </Box>
              <IconButton
                color="inherit"
                onClick={() => handleRemoveItem(item.id)}
                disabled={removeLoading}
                sx={{ color: "text.secondary" }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Total: {cart.total}.00 EUR
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleProceedToCheckout}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            borderRadius: 2,
          }}
        >
          PURCHASE
        </Button>
      </Box>
      <CommonModal
        open={purchaseModalOpen}
        onClose={handleClosePurchaseModal}
        type="purchase"
        content={<PurchaseCompleteContent onClose={handleClosePurchaseModal} />}
        maxWidth="sm"
      />
    </Container>
  );
};

export default CartPage;
