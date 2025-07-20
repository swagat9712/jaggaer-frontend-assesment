import { useQuery, useMutation } from '@apollo/client';
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_CART,
  GET_CART_COUNT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from '../apollo';

export const useProducts = () => {
  return useQuery(GET_PRODUCTS);
};

export const useProduct = (id) => {
  return useQuery(GET_PRODUCT, {
    variables: { id },
    skip: !id,
  });
};

export const useCart = () => {
  return useQuery(GET_CART, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useCartCount = () => {
  return useQuery(GET_CART_COUNT, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useAddToCart = () => {
  return useMutation(ADD_TO_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT],
    awaitRefetchQueries: true,
  });
};

export const useRemoveFromCart = () => {
  return useMutation(REMOVE_FROM_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT],
    awaitRefetchQueries: true,
  });
};

export const useClearCart = () => {
  return useMutation(CLEAR_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT],
    awaitRefetchQueries: true,
  });
};
