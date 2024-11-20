import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Title } from '@mantine/core';

import { productApi } from 'resources/product';

import { Product } from 'types';

const YourProducts: NextPage = () => {
  const { data: products } = productApi.useYourProductsList();
  const { mutate: productDelete } = productApi.useProductDelete();

  const onRowClick = (product: Product) => {
    productDelete({ productId: product._id });
  };

  return (
    <>
      <Head>
        <title>Your Products</title>
      </Head>

      <Stack gap="lg">
        <Title order={2}>Your Products</Title>
        {!!products &&
          products?.map((product) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{product.title}</div>
              <div>{`${product.sold}`}</div>
              <button type="button" onClick={() => onRowClick(product)}>
                delete your product
              </button>
            </div>
          ))}
      </Stack>
    </>
  );
};

export default YourProducts;
