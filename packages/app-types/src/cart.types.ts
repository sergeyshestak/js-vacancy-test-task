import { z } from 'zod';

import { addProductToCartSchema, cartSchema, deleteProductFromCartSchema, purchaseHistorySchema } from 'schemas';

export type Cart = z.infer<typeof cartSchema>;
export type AddProductToCart = z.infer<typeof addProductToCartSchema>;
export type DeleteProductFromCart = z.infer<typeof deleteProductFromCartSchema>;
export type ProductsList = string[];
export type PurchaseHistory = z.infer<typeof purchaseHistorySchema>;
