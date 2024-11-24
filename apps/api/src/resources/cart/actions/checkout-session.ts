import Stripe from 'stripe';

import { AppKoaContext, AppRouter, Purchase } from 'types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true });

async function handler(ctx: AppKoaContext) {
  const purchases = <Purchase[]>ctx.request.body;

  const lineItems = await Promise.all(
    purchases.map(async ({ name, images, unit_amount }) => {
      const product = await stripe.products.create({
        name,
        images,
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: unit_amount * 100,
        currency: 'usd',
      });

      return { price: price.id, quantity: 1 };
    }),
  );

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${ctx.request.headers.origin}/purchase-result?success=true`,
    cancel_url: `${ctx.request.headers.origin}/purchase-result?success=false`,
  });

  ctx.body = { checkoutSessionId: session.id };
}

export default (router: AppRouter) => {
  router.post('/checkout-session', handler);
};
