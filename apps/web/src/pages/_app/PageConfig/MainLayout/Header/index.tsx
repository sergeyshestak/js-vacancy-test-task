import React, { FC, memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Anchor,
  AppShell,
  Badge,
  Button,
  FloatingIndicator,
  Group,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';

import { accountApi } from 'resources/account';
import { cartApi } from 'resources/cart';

import { CartImage, ShopyImage, SignOutImage } from 'public/images';

import { RoutePath } from 'routes';

import classes from './index.module.css';

const Header: FC = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>(RoutePath.Home);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});

  const { data: account } = accountApi.useGet();
  const { mutate: signOut } = accountApi.useSignOut();
  const { data: cart } = cartApi.useCart();

  useEffect(() => {
    if (router.route === RoutePath.Home || router.route === RoutePath.YourProducts) {
      return;
    }

    if (router.route?.includes(RoutePath.YourProducts)) {
      setValue(RoutePath.YourProducts);
      return;
    }

    setValue(router.route);
  }, [router]);

  if (!account) return null;

  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const onTabChange = (route: string | null) => {
    setValue(route);
    router.push(route || RoutePath.Home);
  };

  return (
    <AppShell.Header className={classes.header}>
      <Group h={100} px={48} py={0} justify="space-between">
        <Anchor component={Link} href={RoutePath.Home} underline="never">
          <Group h={100} px={0} py={0} justify="space-between">
            <ShopyImage />
            <Title order={1} className={classes.title}>
              Shopy
            </Title>
          </Group>
        </Anchor>
        <Tabs variant="none" value={value} onChange={onTabChange}>
          <Tabs.List ref={setRootRef} className={classes.list}>
            <Tabs.Tab value={RoutePath.Home} ref={setControlRef(RoutePath.Home)} className={classes.tab}>
              <Text>Marketplace</Text>
            </Tabs.Tab>
            <Tabs.Tab
              value={RoutePath.YourProducts}
              ref={setControlRef(RoutePath.YourProducts)}
              className={classes.tab}
            >
              <Text>Your Products</Text>
            </Tabs.Tab>

            <FloatingIndicator
              target={value ? controlsRefs[value] : null}
              parent={rootRef}
              className={classes.indicator}
            />
          </Tabs.List>
        </Tabs>
        <Group h={100} px={0} py={0} justify="space-between" gap={16}>
          <Anchor
            component={Link}
            href={RoutePath.Cart}
            underline="never"
            variant="transparent"
            pos="relative"
            h={40}
            w={40}
            px={0}
            py={0}
            bd={0}
            pt={7}
          >
            <CartImage />
            {!!cart?.length && (
              <Badge circle bg={theme.colors.blue[1]} pos="absolute" top={0} right={0} color={theme.colors.white[0]}>
                {cart?.length}
              </Badge>
            )}
          </Anchor>
          <Button onClick={() => signOut()} variant="transparent" h={40} w={40} px={0} py={0} bd={0}>
            <SignOutImage />
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default memo(Header);
