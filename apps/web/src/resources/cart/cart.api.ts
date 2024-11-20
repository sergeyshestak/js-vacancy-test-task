import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import {
  AddProductToCart,
  ApiError,
  CheckoutSession,
  DeleteProductFromCart,
  Product,
  Purchase,
  PurchaseHistory,
} from 'types';

export const useCheckoutSession = <T = Purchase[]>() =>
  useMutation<CheckoutSession, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/cart/checkout-session', data),
  });

export const useCart = () =>
  useQuery<Product[]>({
    queryKey: ['cart'],
    queryFn: () => apiService.get(`/cart`),
  });

export const usePurchaseHistory = () =>
  useQuery<PurchaseHistory>({
    queryKey: ['history'],
    queryFn: () => apiService.get(`/cart/history`),
  });

export const useAddProductToCart = <T = AddProductToCart>() =>
  useMutation<null, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/cart/add', data),
  });

export const useDeleteProductFromCart = <T = DeleteProductFromCart>() =>
  useMutation<null, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/cart/delete', data),
  });

export const usePaymentSucceeded = () =>
  useMutation<null, ApiError>({
    mutationFn: () => apiService.get('/cart/payment-succeeded'),
  });
