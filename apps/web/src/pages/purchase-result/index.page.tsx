import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Stack } from '@mantine/core';

import { cartApi } from 'resources/cart';

import { Info } from 'components';

const PurchaseResult: NextPage = () => {
  const router = useRouter();
  const { mutate: paymentSucceeded } = cartApi.usePaymentSucceeded();
  const { success } = router.query;

  useEffect(() => {
    if (success === 'true') {
      paymentSucceeded();
    }
  }, [success]);

  return (
    <>
      <Head>
        <title>Purchase Result</title>
      </Head>
      <Stack>
        <Info type={success === 'true' ? 'paymentSuccessfull' : 'paymentFailed'} />
      </Stack>
    </>
  );
};

export default PurchaseResult;
