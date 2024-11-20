import { eventBus, InMemoryEvent } from '@paralect/node-mongo';

import ioEmitter from 'io-emitter';

import logger from 'logger';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { Product } from 'types';

const { PRODUCTS } = DATABASE_DOCUMENTS;

eventBus.on(`${PRODUCTS}.deleted`, (data: InMemoryEvent<Product>) => {
  try {
    const product = data.doc;

    ioEmitter.publishToUser(product.userId, 'product:deleted', product._id);
  } catch (err) {
    logger.error(`${PRODUCTS}.updated handler error: ${err}`);
  }
});
