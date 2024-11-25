import { cartService } from 'resources/cart';
import { productService } from 'resources/product';

import { COOKIES } from 'app-constants';
import { AppKoaContext, AppRouter, Next } from 'types';

async function validator(ctx: AppKoaContext, next: Next) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);
  const isCartExists = await cartService.exists({ userId });

  if (!isCartExists) {
    await cartService.insertOne({
      userId,
      purchaseHistory: [],
      cart: [],
    });
  }

  await next();
}

async function handler(ctx: AppKoaContext) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);
  const cart = await cartService.findOne({ userId });
  const { results: products } = await productService.find({ _id: { $in: cart?.cart } });

  ctx.body = products;
}

export default (router: AppRouter) => {
  router.get('/', validator, handler);
};
