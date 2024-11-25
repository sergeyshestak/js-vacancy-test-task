import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { BackgroundImage, Badge, Button, Flex, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';

import { productApi } from 'resources/product';

import { DeleteProduct } from 'public/images';

import { Product } from 'types';

import NewProduct from './components/NewProduct';

import classes from './index.module.css';

const YourProducts: NextPage = () => {
  const theme = useMantineTheme();
  const { data: products } = productApi.useYourProductsList();
  const { mutate: productDelete } = productApi.useProductDelete();

  const onDelete = (product: Product) => {
    productDelete({ productId: product._id });
  };

  return (
    <>
      <Head>
        <title>Your Products</title>
      </Head>
      <Title order={5}>Your Products</Title>

      <Group gap="lg" wrap="wrap" mt={20}>
        <NewProduct />

        {!!products &&
          products?.map((product) => (
            <Group
              key={product._id}
              h={270}
              w={270}
              gap={0}
              bg={theme.colors.white[0]}
              bd={`1px solid ${theme.colors.black[4]}`}
              className={classes.productsContainer}
              align="flex-start"
            >
              <BackgroundImage src={product.image} h={170} display="flex">
                <Stack justify="space-between" align="flex-end" flex={1} p={16}>
                  <Button bg={theme.colors.white[0]} pl={14} pr={14} onClick={() => onDelete(product)}>
                    <DeleteProduct />
                  </Button>
                  {product.sold ? <Badge variant="sold">Sold</Badge> : <Badge variant="onSale">On sale</Badge>}
                </Stack>
              </BackgroundImage>
              <Flex p={16} flex={1} justify="space-between" direction="column" gap={18}>
                <Text className={classes.productsTitle}>{product.title}</Text>
                <Flex justify="space-between" flex={1}>
                  <Text className={classes.productPriceText}>Price:</Text>
                  <Text className={classes.productsPrice}>${product.unitPrice}</Text>
                </Flex>
              </Flex>
            </Group>
          ))}
      </Group>
    </>
  );
};

export default YourProducts;
