import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema
  .extend({
    title: z.string().min(1, 'Please enter title').max(30),
    unitPrice: z.number().min(1, 'Please enter unit price').max(100000),
    image: z.string(),
    userId: z.string(),
    sold: z.boolean().default(false),
  })
  .strip();

export const productCreateSchema = productSchema.pick({
  title: true,
  unitPrice: true,
  image: true,
});

export const productDeleteSchema = z.object({
  productId: z.string(),
});
