import { routeUtil } from 'utils';

import checkoutSession from './actions/checkout-session';

const privateRoutes = routeUtil.getRoutes([checkoutSession]);

export default {
  privateRoutes,
};
