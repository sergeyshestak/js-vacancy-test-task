import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Group, LoadingOverlay, Stack, TextInput, Title } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { productApi } from 'resources/product';

import { PrimaryButton } from 'components';

import { productCreateSchema } from 'schemas';
import { ProductCreateParams } from 'types';

import PhotoUpload from './components/PhotoUpload';

import classes from './index.module.css';

const CreateProduct: NextPage = () => {
  const router = useRouter();
  const { mutate: createProduct, isPending } = productApi.useProductCreate<FormData>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductCreateParams>({
    resolver: zodResolver(productCreateSchema),
  });

  const onSubmit = (res: ProductCreateParams) => {
    const body = new FormData();

    body.append('image', res.image, res.image.name);
    body.append('title', res.title);
    body.append('unitPrice', `${res.unitPrice}`);

    createProduct(body, {
      onSuccess: () => {
        router.push('/your-products');
      },
    });
  };

  return (
    <>
      <Head>
        <title>Create New Product</title>
      </Head>

      <Stack gap="lg" mb={20}>
        <Title order={5}>Create New Product</Title>
      </Stack>

      <Stack pos="relative" maw="40%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <PhotoUpload setValue={setValue} />
          <Stack gap={28} mt={5}>
            <Stack gap={20}>
              <TextInput
                {...register('title')}
                label="Title of the product"
                placeholder="Enter title of the product..."
                error={errors.title?.message}
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
              />

              <TextInput
                {...register('unitPrice', {
                  valueAsNumber: true,
                })}
                label="Price"
                placeholder="Enter price of the product"
                error={errors.unitPrice?.message}
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
              />
            </Stack>

            <Group justify="flex-end">
              <PrimaryButton type="submit" disabled={isPending}>
                Upload Product
              </PrimaryButton>
            </Group>
          </Stack>
        </form>

        <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      </Stack>
    </>
  );
};

export default CreateProduct;
