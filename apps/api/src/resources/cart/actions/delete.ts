import { cartService } from 'resources/cart';

import { validateMiddleware } from 'middlewares';

import { COOKIES } from 'app-constants';
import { addProductToCartSchema } from 'schemas';
import { AddProductToCart, AppKoaContext, AppRouter, Next } from 'types';

async function validator(ctx: AppKoaContext<AddProductToCart>, next: Next) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);

  const cart = await cartService.findOne({ userId });

  ctx.assertClientError(!!cart, {
    cart: 'Cart for user does not exist',
  });

  await next();
}

async function handler(ctx: AppKoaContext<AddProductToCart>) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);
  const { productId } = ctx.validatedData;
  const cart = await cartService.findOne({ userId });

  if (cart?.cart) {
    await cartService.updateOne({ userId }, () => ({ cart: [...cart.cart.filter((id) => id !== productId)] }));
  }

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/delete', validateMiddleware(addProductToCartSchema), validator, handler);
};
