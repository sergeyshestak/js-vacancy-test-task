import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Stack } from '@mantine/core';

const PurchaseResult: NextPage = () => {
  const router = useRouter();

  const { success } = router.query;

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
