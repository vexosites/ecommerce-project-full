import { ProductImagesController } from './productImages.controller.js';
import { ProductImagesService } from './productImages.service.js';
import { ProductImagesValidator } from './productImages.validator.js';

export function MakeProductImagesModule(){
    const VALIDATOR = new ProductImagesValidator();
    const SERVICE = new ProductImagesService();
    const controller = new ProductImagesController(VALIDATOR, SERVICE);
return controller;
}