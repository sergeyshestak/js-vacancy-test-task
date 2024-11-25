import React, { FC } from 'react';
import { Button, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';

import { ProductsListParams } from 'resources/product';

import classes from './index.module.css';

interface FiltersProps {
  setParams: ReturnType<typeof useSetState<ProductsListParams>>[1];
  params: ProductsListParams;
}

const FilterTags: FC<FiltersProps> = ({ setParams, params }) => {
  const theme = useMantineTheme();
  const priceStr = !params.filter?.priceTo
    ? `From: $${params.filter?.priceFrom}`
    : `$${params.filter?.priceFrom ?? 0}-$${params.filter?.priceTo ?? ''}`;

  const resetPrice = () => {
    setParams({ filter: {} });
  };

  return (
    !!Object.keys(params.filter || {}).length && (
      <Group>
        <Stack className={classes.tag} justify="center" pl={20} pr={12} pt={10} pb={10}>
          <Group justify="space-between" gap={0}>
            <Text className={classes.tagText}>{priceStr}</Text>
            <Button
              h={16}
              w={16}
              m={8}
              p={0}
              onClick={resetPrice}
              variant="transparent"
              bg={theme.colors.black[1]}
              className={classes.tagBtn}
            >
              <IconX size={16} color={theme.colors.white[0]} />
            </Button>
          </Group>
        </Stack>
      </Group>
    )
  );
};
export default FilterTags;
