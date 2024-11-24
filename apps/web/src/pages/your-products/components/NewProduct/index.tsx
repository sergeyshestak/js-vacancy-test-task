import React, { FC } from 'react';
import Link from 'next/link';
import { Anchor, Center, Flex, Text, useMantineTheme } from '@mantine/core';

import { CreateProductImage } from 'public/images';

import { RoutePath } from 'routes';

import classes from './index.module.css';

const NewProduct: FC = () => {
  const theme = useMantineTheme();

  return (
    <Anchor component={Link} href={RoutePath.CreateProduct} h={270} w={270} display="flex" underline="never">
      <Flex
        justify="center"
        align="center"
        flex={1}
        direction="column"
        gap={12}
        className={classes.link}
        bg={theme.colors.white[0]}
        bd={`1px solid ${theme.colors.black[4]}`}
      >
        <Center bg={theme.colors.blue[1]} p={8} h={40} w={40} className={classes.icon}>
          <CreateProductImage />
        </Center>
        <Text>New Product</Text>
      </Flex>
    </Anchor>
  );
};

export default NewProduct;
