import React, { FormEvent, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Title } from '@mantine/core';
import { UseQueryResult } from '@tanstack/react-query';

import { cartApi } from 'resources/cart';

import { getStripe } from 'utils';

import { Product, Purchase } from 'types';

const Cart: NextPage = () => {
  const { mutate: createCheckout, data } = cartApi.useCheckoutSession();
  const { data: products }: UseQueryResult<Product[]> = cartApi.useCart();
  const { mutate: deleteProductFromCart } = cartApi.useDeleteProductFromCart();

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

  const onRowClick = (product: Product) => {
    deleteProductFromCart({ productId: product._id });
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Stack gap="lg">
        <Title order={2}>Cart</Title>
        Cart Page
      </Stack>
      <form onSubmit={handleSubmit}>
        <button type="submit">checkout</button>
      </form>
      {!!products &&
        products?.map((product) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>{product.title}</p>
            <button type="button" onClick={() => onRowClick(product)}>
              delete from cart
            </button>
          </div>
        ))}
    </>
  );
};

export default Cart;
