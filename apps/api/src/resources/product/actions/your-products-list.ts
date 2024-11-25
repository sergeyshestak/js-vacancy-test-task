import { productService } from 'resources/product';

import { COOKIES } from 'app-constants';
import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);

  const result = await productService.find({ userId });

  ctx.body = result.results;
}

export default (router: AppRouter) => {
  router.get('/your-products', handler);
};
