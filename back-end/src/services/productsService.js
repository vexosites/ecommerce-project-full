import AppError from "../errors/UserError.js";
import ImagesProductService from "./ImagesProductService.js";

class ProductService {
  constructor(ProductRepository, ImagesRepository) {
    this.ProductRepository = ProductRepository;
    this.ImagesRepository = ImagesRepository;
  }
  async post(validator) {
    try {
      console.log("validator-service", validator)
      const { name, categoryId, description, price, stock, slug } =
        validator;

      const product = await this.ProductRepository.create({
        name,
        categoryId,
        price,
        description,
        stock,
        slug
      });

      return {
        product
      };

    } catch (error) {
      if (error.code === "P2002") {
        throw new AppError("product already exists", 401);
      }
      if (error.code === "P2003") {
        throw new AppError("invalid category", 404);
      }
      console.log(error);
      throw error;
    }
  }

  async get(name){
   try {
    const product_raw = await this.ProductRepository.findByName(name);
    if(!product_raw) throw new AppError('product not found', 404)
    const imgs_raw = await ImagesProductService.get(product_raw.id);
    if(imgs_raw.length > 0) {
      
      const product = product_raw.imgs = imgs_raw;
      return product;
    }
    return product_raw;
   } catch (error) {
    console.log(error)
    throw error;
   } 
  }

  async getById(validator){
    try {
      const product_raw = await this.ProductRepository.findById(validator.id);
      if(!product_raw){
        return new AppError('product not found', 404);
      }
      const imgs = await ImagesProductService?.get(product_raw.id);
      if(imgs.length < 0) {
        return product_raw
      }
      product_raw.imgs = imgs;
      return product_raw 
    } catch (error) {
      console.log('error', error)
      return new AppError('', 500)
    }
  }
}

import ProductRepository from "../repositories/products-repository.js";
import imagesRepository from "../repositories/images-repository.js";

export default new ProductService(
  ProductRepository,
  imagesRepository,
);
