import React, { FC, ReactElement } from 'react';
import { Center, Image, SimpleGrid, useMantineTheme } from '@mantine/core';

import { WelcomeScreen } from 'public/images';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => {
  const theme = useMantineTheme();

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" bg={theme.colors.black[6]}>
      <Center component="main" h="100vh" w="100%" px={32}>
        {children}
      </Center>
      <Center h="100vh" w="100%" px={32}>
        <Image src={WelcomeScreen.src} w="auto" fit="contain" h="100vh" />
      </Center>
    </SimpleGrid>
  );
};

export default UnauthorizedLayout;
