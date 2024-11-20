import { eventBus, InMemoryEvent } from '@paralect/node-mongo';

import { productService } from 'resources/product';

import ioEmitter from 'io-emitter';

import logger from 'logger';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { Cart } from 'types';

const { CARTS } = DATABASE_DOCUMENTS;

eventBus.on(`${CARTS}.updated`, async (data: InMemoryEvent<Cart>) => {
  try {
    const cart = data.doc;
    const { results: products } = await productService.find({ _id: { $in: cart?.cart } });

    ioEmitter.publishToUser(cart.userId, 'cart:updated', products);
  } catch (err) {
    logger.error(`${CARTS}.updated handler error: ${err}`);
  }
});
