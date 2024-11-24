import React, { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Alert, Anchor, Group, PasswordInput, Stack, TextInput, Title, useMantineTheme } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAlertCircle } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';

import { accountApi } from 'resources/account';

import { PrimaryButton } from 'components';

import { handleApiError } from 'utils';

import { RoutePath } from 'routes';

import { signInSchema } from 'schemas';
import { SignInParams } from 'types';

import classes from './index.module.css';

type SignInParamsWithCredentials = SignInParams & { credentials?: string };

const SignIn: NextPage = () => {
  const theme = useMantineTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInParamsWithCredentials>({ resolver: zodResolver(signInSchema) });

  const { mutate: signIn, isPending: isSignInPending } = accountApi.useSignIn();

  const onSubmit = (data: SignInParamsWithCredentials) =>
    signIn(data, {
      onError: (e) => handleApiError(e, setError),
    });

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <Stack w={400} gap={20}>
        <Stack gap={32}>
          <Title order={1}>Sign In</Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                {...register('email')}
                label="Email Address"
                placeholder="Enter address"
                error={errors.email?.message}
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
              />

              <PasswordInput
                {...register('password')}
                label="Password"
                placeholder="Enter password"
                error={errors.password?.message}
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
              />

              {errors.credentials && (
                <Alert icon={<IconAlertCircle />} color="red">
                  {errors.credentials.message}
                </Alert>
              )}
            </Stack>

            <PrimaryButton type="submit" loading={isSignInPending} fullWidth mt={32}>
              Sign in
            </PrimaryButton>
          </form>
        </Stack>

        <Stack gap={32}>
          <Group justify="center" gap={12}>
            Don’t have an account?
            <Anchor component={Link} href={RoutePath.SignUp} c={theme.colors?.blue[1]}>
              Sign up
            </Anchor>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default SignIn;
