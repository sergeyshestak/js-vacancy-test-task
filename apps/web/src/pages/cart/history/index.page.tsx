import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Group, LoadingOverlay } from '@mantine/core';

import { cartApi } from 'resources/cart';

import { Info } from 'components';

import Table from '../components/Table';

const History: NextPage = () => {
  const { data: history, isLoading } = cartApi.usePurchaseHistory();

  return (
    <>
      <Head>
        <title>History</title>
      </Head>

      <Group pos="relative">
        <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

        {!!history && history.length ? <Table type="history" data={history} /> : <Info type="emptyState" />}
      </Group>
    </>
  );
};

export default History;
