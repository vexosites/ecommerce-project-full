import { Router } from 'express';

import users from '../../modules/users/users.routes.js';
import products from '../../modules/products/products.routes.js';
import categories from '../../modules/categories/categories.routes.js';
import cart from '../../modules/cart/cart.routes.js';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Server running!');
});

routes.use('/users', users);
routes.use('/products', products);
routes.use('/categories', categories);
routes.use('/cart', cart);

export { routes };