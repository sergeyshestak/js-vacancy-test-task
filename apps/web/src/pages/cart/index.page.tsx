import React, { FormEvent, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Divider, Group, LoadingOverlay, Stack, Text, useMantineTheme } from '@mantine/core';
import { UseQueryResult } from '@tanstack/react-query';

import { cartApi } from 'resources/cart';

import { Info, PrimaryButton } from 'components';

import { getStripe } from 'utils';

import { Product, Purchase } from 'types';

import Table from './components/Table';

import classes from './index.module.css';

const Cart: NextPage = () => {
  const theme = useMantineTheme();
  const { mutate: createCheckout, data } = cartApi.useCheckoutSession();
  const { data: products, isLoading }: UseQueryResult<Product[]> = cartApi.useCart();
  const { mutate: deleteProductFromCart } = cartApi.useDeleteProductFromCart();
  const totalPrice = useMemo(() => products?.reduce((acc, product) => acc + product.unitPrice, 0), [products]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!products) return;

    const purchases = products.reduce<Array<Purchase>>((acc, product) => {
      const purchase: Purchase = {
        name: product.title,
        unit_amount: product.unitPrice,
        ...(!!product.image && { images: [product.image] }),
      };
      acc.push(purchase);

      return acc;
    }, []);

    createCheckout(purchases);
  };

  useEffect(() => {
    if (!data?.checkoutSessionId) {
      return;
    }

    const redirectToStripeCheckoutSession = async () => {
      const stripe = await getStripe();
      await stripe!.redirectToCheckout({
        sessionId: data.checkoutSessionId,
      });
    };

    redirectToStripeCheckoutSession();
  }, [data]);

  const onRemoveClick = (product: Partial<Product>) => {
    deleteProductFromCart({ productId: product._id || '' });
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      {!!products && products.length ? (
        <Group pos="relative" justify="space-between" align="flex-start" gap={80}>
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

          <Table data={products} onRemoveClick={onRemoveClick} type="cart" />
          <Group bg={theme.colors.white[0]} flex={1} p={20} className={classes.cartFormContainer} mt={-44}>
            <form onSubmit={handleSubmit} className={classes.cartForm}>
              <Stack flex={1} gap={16}>
                <Text className={classes.cartTitle}>Summary</Text>
                <Divider my="md" />
                <Group justify="space-between">
                  <Text className={classes.cartTotalPriceText}>Total price</Text>
                  <Text className={classes.cartTotalPrice}>${totalPrice}</Text>
                </Group>
                <PrimaryButton type="submit">Proceed to Checkout</PrimaryButton>
              </Stack>
            </form>
          </Group>
        </Group>
      ) : (
        <Stack>
          <Info type="emptyState" />
        </Stack>
      )}
    </>
  );
};

export default Cart;
