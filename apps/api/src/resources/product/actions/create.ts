import multer from '@koa/multer';

import { productService } from 'resources/product';

import { cloudStorageService } from 'services';

import { COOKIES } from 'app-constants';
import { AppKoaContext, AppRouter, Next, ProductCreateParams } from 'types';

const upload = multer();

async function validator(ctx: AppKoaContext<ProductCreateParams>, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(
  ctx: AppKoaContext<ProductCreateParams, { image: File; body: { title: string; unitPrice: string } }>,
) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);
  const {
    file,
    body: { title, unitPrice },
  } = ctx.request;

  const fileName = `${userId}-${Date.now()}-${file.originalname}`;
  const { location: productUrl } = await cloudStorageService.uploadPublic(`products/${fileName}`, file);

  await productService.insertOne({
    title,
    unitPrice: Number(unitPrice),
    userId,
    image: productUrl,
    sold: false,
  });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/create', upload.single('image'), validator, handler);
};
