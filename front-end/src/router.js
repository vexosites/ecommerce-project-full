import path from 'node:path'
import { KeepAlive } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// Importar componentes de página (você precisará criar esses componentes)
// import Home from './src/views/Home.vue'
// import Products from './src/views/Products.vue'
// import ProductDetail from './src/views/ProductDetail.vue'
// import Cart from './src/views/Cart.vue'
// import Checkout from './src/views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./routes/home.vue'),
    meta: {
      KeepAlive: true
    }
  }, 
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import('./routes/category.vue'),
    meta: {
      KeepAlive: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    // component: Products
  },
  {
    path: '/product/:slug',
    name: 'ProductDetail',
    component: () => import('./routes/product.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    // component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    // component: Checkout
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./routes/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
