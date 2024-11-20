import { z } from 'zod';

import { productCreateSchema, productDeleteSchema, productSchema } from 'schemas';

export type Product = z.infer<typeof productSchema>;
export type ProductCreateParams = z.infer<typeof productCreateSchema>;
export type ProductDeleteParams = z.infer<typeof productDeleteSchema>;
