import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Title } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { SortDirection } from '@tanstack/react-table';
import { pick } from 'lodash';

import { cartApi } from 'resources/cart';
import { productApi, ProductsListParams } from 'resources/product';

import { Table } from 'components';

import { Product, ProductCreateParams } from 'types';

import Filters from './components/Filters';
import { COLUMNS, DEFAULT_PAGE, DEFAULT_PARAMS, EXTERNAL_SORT_FIELDS, PER_PAGE } from './constants';

const Home: NextPage = () => {
  const [params, setParams] = useSetState<ProductsListParams>(DEFAULT_PARAMS);
  const { mutate: addProductToCart } = cartApi.useAddProductToCart();

  const { data: products, isLoading: isProductLostLoading } = productApi.useList(params);
  const { mutate: productCreate } = productApi.useProductCreate();

  const onSortingChange = (sort: Record<string, SortDirection>) => {
    setParams((prev) => {
      const combinedSort = { ...pick(prev.sort, EXTERNAL_SORT_FIELDS), ...sort };

      return { sort: combinedSort };
    });
  };

  const onRowClick = (product: Product) => {
    addProductToCart({ productId: product._id });
  };

  const onCreate = () => {
    const product: ProductCreateParams = {
      title: 'Mock Product 11',
      unitPrice: 999,
      image: '',
    };

    productCreate(product);
  };

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Stack gap="lg">
        <Title order={2}>Products</Title>

        <button type="button" onClick={onCreate}>
          Create Product
        </button>

        <Filters setParams={setParams} />

        <Table<Product>
          data={products?.results}
          totalCount={products?.count}
          pageCount={products?.pagesCount}
          page={DEFAULT_PAGE}
          perPage={PER_PAGE}
          columns={COLUMNS}
          isLoading={isProductLostLoading}
          onPageChange={(page) => setParams({ page })}
          onSortingChange={onSortingChange}
          onRowClick={onRowClick}
        />
      </Stack>
    </>
  );
};

export default Home;
