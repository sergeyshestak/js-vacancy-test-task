import React, { FC, useLayoutEffect, useState } from 'react';
import { Button, Group, NumberInput, Stack, Text } from '@mantine/core';
import { useDebouncedValue, useSetState } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';

import { ProductsListParams } from 'resources/product';

import classes from './index.module.css';

interface FiltersProps {
  setParams: ReturnType<typeof useSetState<ProductsListParams>>[1];
  params: ProductsListParams;
}
interface NumberInputFilter {
  priceFrom?: string | number;
  priceTo?: string | number;
}

const Filters: FC<FiltersProps> = ({ setParams, params }) => {
  const [priceFrom, setPriceFrom] = useState<string | number>('');
  const [priceTo, setPriceTo] = useState<string | number>('');

  const [debouncedPriceFrom] = useDebouncedValue(priceFrom, 500);
  const [debouncedPriceTo] = useDebouncedValue(priceTo, 500);

  const resetAllFilters = () => {
    setParams({ filter: {} });
  };

  useLayoutEffect(() => {
    if (
      Number(debouncedPriceFrom) > Number(debouncedPriceTo) &&
      !Number.isNaN(Number(debouncedPriceTo)) &&
      debouncedPriceTo !== ''
    ) {
      setPriceTo(debouncedPriceFrom);
    }
  }, [debouncedPriceFrom]);

  useLayoutEffect(() => {
    if (
      Number(debouncedPriceTo) < Number(debouncedPriceFrom) &&
      !Number.isNaN(Number(debouncedPriceFrom)) &&
      debouncedPriceFrom !== ''
    ) {
      setPriceFrom(debouncedPriceTo);
    }
  }, [debouncedPriceTo]);

  useLayoutEffect(() => {
    const filter: NumberInputFilter = {};

    if (debouncedPriceFrom !== '' && !Number.isNaN(Number(debouncedPriceFrom))) {
      filter.priceFrom = Number(debouncedPriceFrom);
    }

    if (debouncedPriceTo !== '' && !Number.isNaN(Number(debouncedPriceTo))) {
      filter.priceTo = Number(debouncedPriceTo);
    }

    setParams({
      filter,
    });
  }, [debouncedPriceTo, debouncedPriceFrom]);

  useLayoutEffect(() => {
    if (!Object.keys(params.filter || {}).length) {
      setPriceFrom('');
      setPriceTo('');
    }
  }, [params]);

  return (
    <Group wrap="nowrap" justify="space-between" w={315} className={classes.filter}>
      <Stack p={20} flex={1} gap={32}>
        <Group justify="space-between">
          <Text className={classes.filterTitle}>Filters</Text>
          <Button
            p={2}
            h={20}
            onClick={resetAllFilters}
            className={classes.filterResetBtn}
            variant="transparent"
            rightSection={<IconX size={16} />}
          >
            Reset All
          </Button>
        </Group>
        <Stack>
          <Text className={classes.filterText}>Price</Text>
          <Group justify="space-between" gap={0}>
            <NumberInput
              w={130}
              leftSectionWidth={60}
              leftSectionPointerEvents="none"
              classNames={{ input: classes.filterPriceInput }}
              hideControls
              size="md"
              value={priceFrom}
              onChange={setPriceFrom}
              leftSection={<Text className={classes.filterPriceInputLeftSectionText}>From:</Text>}
              suffix="$"
            />
            <NumberInput
              w={130}
              leftSectionPointerEvents="none"
              classNames={{ input: classes.filterPriceInput }}
              hideControls
              size="md"
              value={priceTo}
              onChange={setPriceTo}
              leftSection={<Text className={classes.filterPriceInputLeftSectionText}>To:</Text>}
              suffix="$"
            />
          </Group>
        </Stack>
      </Stack>
    </Group>
  );
};
export default Filters;
