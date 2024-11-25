import { routeUtil } from 'utils';

import addProductToCart from './actions/add';
import checkoutSession from './actions/checkout-session';
import deleteProductFromCart from './actions/delete';
import getCart from './actions/get-cart';
import getHistory from './actions/get-purchase-history';
import paymentSucceeded from './actions/payment-succeeded';

const privateRoutes = routeUtil.getRoutes([
  checkoutSession,
  addProductToCart,
  getCart,
  getHistory,
  deleteProductFromCart,
  paymentSucceeded,
]);

export default {
  privateRoutes,
};
