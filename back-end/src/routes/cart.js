import express from 'express';
import JwtAuth from '../middlewares/auth/JwtAuth.js';
import CartController from '../controllers/cart.js'

const Router = express.Router()

Router.post('/item', JwtAuth.userAuth, CartController.postItem.bind(CartController));

export default Router;