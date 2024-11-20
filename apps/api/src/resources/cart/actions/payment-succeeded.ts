import { cartService } from 'resources/cart';
import { productService } from 'resources/product';

import { COOKIES } from 'app-constants';
import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);
  const cart = await cartService.findOne({ userId });

  const purchaseDate = new Date();
  const { results: products } = await productService.find({ _id: { $in: cart?.cart } });
  const purchaseHistory = products.map((product) => ({ ...product, date: purchaseDate }));

  await cartService.updateOne({ userId }, (currentCart) => ({
    ...currentCart,
    cart: [],
    purchaseHistory: [...currentCart.purchaseHistory, ...purchaseHistory],
  }));
  await productService.updateMany({ _id: { $in: cart?.cart } }, (product) => ({ ...product, sold: true }));

  ctx.body = { success: true };
}

export default (router: AppRouter) => {
  router.get('/payment-succeeded', handler);
};
