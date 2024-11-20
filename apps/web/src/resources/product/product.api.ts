import { DateValue } from '@mantine/dates';
import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import { ApiError, ListParams, ListResult, Product, ProductCreateParams, ProductDeleteParams, SortOrder } from 'types';

export type ProductsListFilterParams = {
  createdOn?: {
    startDate: DateValue;
    endDate: DateValue;
  };
};

export type ProductsListSortParams = {
  createdOn?: SortOrder;
  title?: SortOrder;
};

export type ProductsListParams = ListParams<ProductsListFilterParams, ProductsListSortParams>;

export const useList = <T extends ProductsListParams>(params: T) =>
  useQuery<ListResult<Product>>({
    queryKey: ['products', params],
    queryFn: () => apiService.get('/products', params),
  });

export const useYourProductsList = () =>
  useQuery<Product[]>({
    queryKey: ['your-products'],
    queryFn: () => apiService.get('/products/your-products'),
  });

export const useProductCreate = <T = ProductCreateParams>() =>
  useMutation<null, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/products/create', data),
  });

export const useProductDelete = <T = ProductDeleteParams>() =>
  useMutation<null, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/products/delete', data),
  });
