import React, { FC, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@mantine/core';

import { RoutePath } from 'routes';

import MainLayout from '../MainLayout';

import classes from './index.module.css';

interface CartLayoutProps {
  children: ReactElement;
}

const CartLayout: FC<CartLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [value, setValue] = useState<string>(RoutePath.Cart);

  return (
    <MainLayout>
      <>
        <Tabs
          variant="none"
          value={value}
          onChange={(route) => {
            setValue(route || RoutePath.Cart);
            router.push(route || RoutePath.Cart);
          }}
        >
          <Tabs.List className={classes.list}>
            <Tabs.Tab value={RoutePath.Cart} className={classes.tab}>
              Cart
            </Tabs.Tab>
            <Tabs.Tab value={RoutePath.History} className={classes.tab}>
              History
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {children}
      </>
    </MainLayout>
  );
};

export default CartLayout;
