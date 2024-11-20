import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Stack } from '@mantine/core';

import { cartApi } from 'resources/cart';

const PurchaseResult: NextPage = () => {
  const router = useRouter();
  const { mutate: paymentSucceeded } = cartApi.usePaymentSucceeded();
  const { success } = router.query;

  useEffect(() => {
    if (success) {
      paymentSucceeded();
    }
  }, [success]);

  return (
    <>
      <Head>
        <title>Purchase Result</title>
      </Head>

      <Stack gap="lg">Purchase Result Page</Stack>
      <Stack gap="lg">Result: {success}</Stack>
    </>
  );
};

export default PurchaseResult;
