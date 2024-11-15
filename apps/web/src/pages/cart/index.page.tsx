import React, { FormEvent, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Title } from '@mantine/core';

import { cartApi } from 'resources/cart';

import { getStripe } from 'utils';

import { Purchase } from 'types';

const purchases: Purchase[] = [
  {
    name: 'Mars',
    images: ['https://js-test-task-shopy.s3.tebi.io/avatars/6731ddeb97b04db02671987e-1731596210148-mars.png'],
    unit_amount: 1999,
    quantity: 1,
  },
  {
    name: 'Snikers',
    images: ['https://js-test-task-shopy.s3.tebi.io/avatars/6731ddeb97b04db02671987e-1731596210148-mars.png'],
    unit_amount: 1099,
    quantity: 2,
  },
];

const Cart: NextPage = () => {
  const { mutate: createCheckout, data } = cartApi.useCheckoutSession();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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
    </>
  );
};

export default Cart;
