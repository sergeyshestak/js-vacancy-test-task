import { useMutation } from '@tanstack/react-query';

import { apiService } from 'services';

import { ApiError, CheckoutSession, Purchase } from 'types';

export const useCheckoutSession = <T = Purchase[]>() =>
  useMutation<CheckoutSession, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/cart/checkout-session', data),
  });
