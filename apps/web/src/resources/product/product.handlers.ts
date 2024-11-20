import { socketService } from 'services';

import queryClient from 'query-client';

import { Product } from 'types';

socketService.on('product:deleted', (productId) => {
  const yourProducts = queryClient.getQueryData<Product[]>(['your-products']);

  if (yourProducts) {
    queryClient.setQueryData<Product[]>(
      ['your-products'],
      yourProducts.filter((product) => product._id !== productId),
    );
  }
});
