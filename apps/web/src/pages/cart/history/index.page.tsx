import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Title } from '@mantine/core';

import { cartApi } from 'resources/cart';

const History: NextPage = () => {
  const { data: history } = cartApi.usePurchaseHistory();

  return (
    <>
      <Head>
        <title>History</title>
      </Head>

      <Stack gap="lg">
        <Title order={2}>History</Title>
        History Page
      </Stack>
      {!!history &&
        history?.map((purchase) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{purchase.title}</div>
            <div>{`${purchase.date}`}</div>
          </div>
        ))}
    </>
  );
};

export default History;
