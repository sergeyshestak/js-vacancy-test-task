import { z } from 'zod';

import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { stringUtil } from 'utils';

import { COOKIES } from 'app-constants';
import { paginationSchema } from 'schemas';
import { AppKoaContext, AppRouter, NestedKeys, Product } from 'types';

const schema = paginationSchema.extend({
  filter: z
    .object({
      priceFrom: z.string().optional(),
      priceTo: z.string().optional(),
    })
    .optional(),
  sort: z
    .object({
      createdOn: z.enum(['asc', 'desc']).optional(),
    })
    .default({}),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const userId = ctx.cookies.get(COOKIES.USER_ID);
  const { perPage, page, sort, searchValue, filter } = ctx.validatedData;

  const filterOptions = [];

  if (searchValue) {
    const searchPattern = stringUtil.escapeRegExpString(searchValue);

    const searchFields: NestedKeys<Product>[] = ['title'];

    filterOptions.push({
      $or: searchFields.map((field) => ({ [field]: { $regex: searchPattern } })),
    });
  }

  if (filter) {
    const { priceTo, priceFrom, ...otherFilters } = filter;
    if (priceTo) {
      filterOptions.push({
        unitPrice: { $lt: Number(priceTo) },
      });
    }

    if (priceFrom) {
      filterOptions.push({
        unitPrice: { $gt: Number(priceFrom) },
      });
    }

    Object.entries(otherFilters).forEach(([key, value]) => {
      filterOptions.push({ [key]: value });
    });
  }

  const result = await productService.find(
    { $and: [...filterOptions, { userId: { $ne: userId }, sold: false }] },
    { page, perPage },
    { sort },
  );

  ctx.body = { ...result, results: result.results };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
