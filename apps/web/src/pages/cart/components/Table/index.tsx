import React from 'react';
import { Button, Group, Image, Table } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import { dateFormat } from 'utils';

import { Product } from 'types';

import Qty from '../Qty';

import classes from './index.module.css';

interface HistoryProduct extends Partial<Product> {
  date?: string;
}

type TableParamsType = {
  data: HistoryProduct[];
  onRemoveClick?: (product: HistoryProduct) => void;
  type: string;
};

const ProductsTable = ({ data, onRemoveClick, type }: TableParamsType) => {
  const rows = data.map((product: HistoryProduct) => (
    <Table.Tr key={product._id}>
      <Table.Td pl={0} className={classes.itemMain}>
        <Group>
          {!!product.image && <Image radius="md" src={product.image} w={80} h={80} />}
          {product.title}
        </Group>
      </Table.Td>
      <Table.Td className={classes.item}>${product.unitPrice}</Table.Td>
      {type === 'cart' && onRemoveClick && (
        <>
          <Table.Td className={classes.item}>
            <Qty />
          </Table.Td>
          <Table.Td className={classes.item}>
            <Button
              onClick={() => onRemoveClick(product)}
              leftSection={<IconX size={20} />}
              variant="transparent"
              className={classes.removeBtn}
            >
              Remove
            </Button>
          </Table.Td>
        </>
      )}
      {type === 'history' && product.date && <Table.Td className={classes.item}>{dateFormat(product.date)}</Table.Td>}
    </Table.Tr>
  ));

  return (
    <Table maw={950}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="60%" pl={0} className={classes.tableHeaderMain}>
            Item
          </Table.Th>
          <Table.Th className={classes.tableHeader}>Unit Price</Table.Th>
          {type === 'cart' && (
            <>
              <Table.Th className={classes.tableHeader}>Quantity</Table.Th>
              <Table.Th className={classes.tableHeader} />
            </>
          )}
          {type === 'history' && <Table.Th className={classes.tableHeader}>Date</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default ProductsTable;
