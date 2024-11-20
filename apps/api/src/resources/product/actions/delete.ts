import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';

import { productDeleteSchema } from 'schemas';
import { AppKoaContext, AppRouter, ProductDeleteParams } from 'types';

async function handler(ctx: AppKoaContext<ProductDeleteParams>) {
  const { productId } = ctx.validatedData;

  await productService.deleteOne({
    _id: productId,
  });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/delete', validateMiddleware(productDeleteSchema), handler);
};
