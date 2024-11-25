import { socketService } from 'services';

import queryClient from 'query-client';

import { ProductsList } from 'types';

socketService.on('cart:updated', (cart) => {
  queryClient.setQueryData<ProductsList>(['cart'], cart);
});
