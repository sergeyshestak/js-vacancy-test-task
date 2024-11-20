import { z } from 'zod';

import dbSchema from './db.schema';
import { productSchema } from './product.schema';

export const purchaseHistorySchema = z.array(
  productSchema.extend({
    date: z.date(),
  }),
);

export const cartSchema = dbSchema
  .extend({
    userId: z.string(),
    cart: z.array(z.string()),
    purchaseHistory: purchaseHistorySchema,
  })
  .strip();

export const addProductToCartSchema = z.object({
  productId: z.string(),
});

export const deleteProductFromCartSchema = addProductToCartSchema;
