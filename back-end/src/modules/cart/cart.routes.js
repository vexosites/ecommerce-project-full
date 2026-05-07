import express from 'express';
import JwtAuth from '../../shared/middlewares/auth/JwtAuth.js';
import CartController from './cart.controller.js'

const Router = express.Router()

Router.post('/item', JwtAuth.userAuth, CartController.postItem.bind(CartController));

export default Router;