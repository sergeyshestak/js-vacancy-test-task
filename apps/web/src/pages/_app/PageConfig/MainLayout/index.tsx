import React, { FC, ReactElement } from 'react';
import { AppShell, Center, Stack, useMantineTheme } from '@mantine/core';

import { accountApi } from 'resources/account';

import Header from './Header';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: account } = accountApi.useGet();
  const theme = useMantineTheme();

  if (!account) return null;

  return (
    <AppShell component={Stack} bg={theme.colors.black[5]}>
      <Header />

      <Center flex={1}>
        <AppShell.Main p={48} pt={account.isShadow ? 144 : 104} maw={1440} flex={1}>
          {children}
        </AppShell.Main>
      </Center>
    </AppShell>
  );
};

export default MainLayout;
