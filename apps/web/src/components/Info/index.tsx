import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Flex, Group, Image, Text, Title, useMantineTheme } from '@mantine/core';

import PrimaryButton from 'components/PrimaryButton';

import { EmptyState, PaymentFailed, PaymentSuccessfull } from 'public/images';

import { RoutePath } from 'routes';

import classes from './index.module.css';

interface IInfo {
  type: 'paymentFailed' | 'paymentSuccessfull' | 'emptyState';
}

const infoTypes = {
  paymentFailed: {
    title: 'Payment Failed',
    subtitle: 'Sorry, your payment failed. \nWould you like to try again?',
    btnText: 'Back to Cart',
    route: RoutePath.Cart,
    image: PaymentFailed,
  },
  paymentSuccessfull: {
    title: 'Payment Successfull',
    subtitle: 'Hooray, you have completed your payment!',
    btnText: 'Back to Cart',
    route: RoutePath.Cart,
    image: PaymentSuccessfull,
  },
  emptyState: {
    title: "Oops, there's nothing here yet!",
    subtitle: "You haven't made any purchases yet. \nGo to the marketplace and make purchases.",
    btnText: 'Go to Marketplace',
    route: RoutePath.Home,
    image: EmptyState,
  },
};

const Info: FC<IInfo> = ({ type }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const data = infoTypes[type];

  return (
    <Group
      m="auto"
      p="20px 75px"
      bg={type === 'emptyState' ? 'transparent' : theme.colors.white[0]}
      className={classes.container}
    >
      <Flex direction="column" align="center" gap={32}>
        <Image src={data.image.src} w={data.image.width} h={data.image.height} />
        <Flex direction="column" align="center" gap={16}>
          <Title>{data.title}</Title>
          <Text style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>{data.subtitle}</Text>
        </Flex>
        <Group>
          <PrimaryButton onClick={() => router.replace(data.route)}>{data.btnText}</PrimaryButton>
        </Group>
      </Flex>
    </Group>
  );
};

export default Info;
