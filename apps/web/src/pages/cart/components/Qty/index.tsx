import React from 'react';
import { Button, Group, Text } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

import classes from './index.module.css';

const Qty = () => {
  const [count, handlers] = useCounter(1, { min: 1 });

  return (
    <Group gap={4} justify="space-between">
      <Button onClick={handlers.decrement} p={10} mb={4} variant="transparent" className={classes.qtyBtn}>
        -
      </Button>
      <Text className={classes.qtyText}>{count}</Text>
      <Button onClick={handlers.increment} p={10} mb={4} variant="transparent" className={classes.qtyBtn}>
        +
      </Button>
    </Group>
  );
};

export default Qty;
