import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';

import { COOKIES } from 'app-constants';
import { productCreateSchema } from 'schemas';
import { AppKoaContext, AppRouter, ProductCreateParams } from 'types';

async function handler(ctx: AppKoaContext<ProductCreateParams>) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);
  const { title, unitPrice, image } = ctx.validatedData;

  await productService.insertOne({
    title,
    unitPrice,
    userId,
    image,
    sold: false,
  });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/create', validateMiddleware(productCreateSchema), handler);
};
