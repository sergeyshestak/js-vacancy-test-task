import React, { FC, ReactElement } from 'react';
import { Center, SimpleGrid } from '@mantine/core';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
    <Center component="main" h="100vh" w="100%" px={32}>
      {children}
    </Center>
  </SimpleGrid>
);

export default UnauthorizedLayout;
