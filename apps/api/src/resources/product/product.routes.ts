import { routeUtil } from 'utils';

import productCreate from './actions/create';
import productDelete from './actions/delete';
import list from './actions/list';
import yourProductList from './actions/your-products-list';

const privateRoutes = routeUtil.getRoutes([list, productCreate, yourProductList, productDelete]);

export default {
  privateRoutes,
};
