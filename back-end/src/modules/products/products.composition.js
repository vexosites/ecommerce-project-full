import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { ProductsValidator } from './products.validator.js';

export function MakeProductsModule(){
    const VALIDATOR = new ProductsValidator();
    const SERVICE = new ProductsService();
    const controller = new ProductsController(VALIDATOR, SERVICE);
return controller;
}