import { ColumnDef } from '@tanstack/react-table';

import { ProductsListParams, ProductsListSortParams } from 'resources/product';

import { Product } from 'types';

export const DEFAULT_PAGE = 1;
export const PER_PAGE = 6;
export const EXTERNAL_SORT_FIELDS: Array<keyof ProductsListSortParams> = ['createdOn'];

export const DEFAULT_PARAMS: ProductsListParams = {
  page: DEFAULT_PAGE,
  searchValue: '',
  perPage: PER_PAGE,
  sort: {
    createdOn: 'desc',
  },
};

export const COLUMNS: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
];
