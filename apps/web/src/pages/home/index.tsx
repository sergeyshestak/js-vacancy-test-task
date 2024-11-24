import React, { useLayoutEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  ActionIcon,
  ComboboxItem,
  Flex,
  Group,
  Image,
  Pagination,
  Select,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue, useInputState, useSetState } from '@mantine/hooks';
import { IconArrowsDownUp, IconChevronDown, IconSearch, IconX } from '@tabler/icons-react';
import { set } from 'lodash';

import { cartApi } from 'resources/cart';
import { productApi, ProductsListParams } from 'resources/product';

import { PrimaryButton } from 'components';

import { Product } from 'types';

import Filters from './components/Filters';
import FilterTags from './components/FilterTags';
import { DEFAULT_PARAMS } from './constants';

import classes from './index.module.css';

const selectOptions: ComboboxItem[] = [
  {
    value: 'newest',
    label: 'Sort by newest',
  },
  {
    value: 'oldest',
    label: 'Sort by oldest',
  },
];

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [params, setParams] = useSetState<ProductsListParams>(DEFAULT_PARAMS);
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useInputState('');
  const [sortBy, setSortBy] = useState<string | null>(selectOptions[0].value);
  const { mutate: addProductToCart } = cartApi.useAddProductToCart();
  const { data: cart } = cartApi.useCart();
  const { data: products } = productApi.useList(params);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  useLayoutEffect(() => {
    setParams({ searchValue: debouncedSearch });
  }, [debouncedSearch]);

  const addToCart = (product: Product) => {
    addProductToCart({ productId: product._id });
  };

  const handleSort = (value: string | null) => {
    setSortBy(value);

    setParams((old) => set(old, 'sort.createdOn', value === 'newest' ? 'desc' : 'asc'));
  };

  useLayoutEffect(() => {
    if (!!products?.pagesCount && activePage > products?.pagesCount) {
      setPage(products?.pagesCount);
      setParams({ page: products?.pagesCount });
    }
  }, [params, products]);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Group align="flex-start">
        <Filters setParams={setParams} params={params} />
        <Stack gap="lg" flex={1}>
          <TextInput
            size="md"
            classNames={{ input: classes.homeSearchInput }}
            value={search}
            onChange={setSearch}
            placeholder="Type to search..."
            leftSection={<IconSearch size={16} />}
            rightSection={
              search && (
                <ActionIcon variant="transparent" onClick={() => setSearch('')}>
                  <IconX color="gray" stroke={1} />
                </ActionIcon>
              )
            }
          />
          <Group justify="space-between">
            <Text className={classes.homeProductsCount}>{products?.count} results</Text>
            <Select
              w={155}
              size="xs"
              p={0}
              variant="unstyled"
              classNames={{
                input: classes.homeSelectText,
              }}
              data={selectOptions}
              value={sortBy}
              onChange={handleSort}
              allowDeselect={false}
              leftSectionWidth={26}
              rightSectionWidth={26}
              rightSection={<IconChevronDown size={20} />}
              leftSection={<IconArrowsDownUp size={20} />}
              comboboxProps={{
                withinPortal: false,
                transitionProps: {
                  transition: 'fade',
                  duration: 120,
                  timingFunction: 'ease-out',
                },
              }}
            />
          </Group>
          <FilterTags setParams={setParams} params={params} />

          <Group gap={20}>
            {!!products?.results &&
              products?.results.map((product) => {
                const disabled = !!cart?.find((productInCart) => productInCart._id === product._id);

                return (
                  <Group
                    key={product._id}
                    maw="32%"
                    gap={0}
                    bg={theme.colors.white[0]}
                    bd={`1px solid ${theme.colors.black[4]}`}
                    className={classes.homeContainer}
                    align="flex-start"
                    justify="center"
                  >
                    <Image src={product.image} h={220} />
                    <Flex p={16} flex={1} justify="space-between" direction="column" gap={18}>
                      <Text className={classes.homeTitle}>{product.title}</Text>
                      <Flex justify="space-between" flex={1}>
                        <Text className={classes.homePriceText}>Price:</Text>
                        <Text className={classes.homePrice}>${product.unitPrice}</Text>
                      </Flex>
                      <PrimaryButton disabled={disabled} onClick={() => addToCart(product)}>
                        {disabled ? 'In Cart' : 'Add to Cart'}
                      </PrimaryButton>
                    </Flex>
                  </Group>
                );
              })}
          </Group>

          <Stack align="center">
            {!!products?.pagesCount && products?.pagesCount !== 1 && (
              <Pagination
                color={theme.colors.blue[1]}
                total={products?.pagesCount}
                value={activePage > products.pagesCount ? products.pagesCount : activePage}
                onChange={(page) => {
                  setParams({ page });
                  setPage(page);
                }}
              />
            )}
          </Stack>
        </Stack>
      </Group>
    </>
  );
};

export default Home;
