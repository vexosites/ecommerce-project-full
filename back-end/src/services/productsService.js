import AppError from "../errors/UserError.js";
import imagesRepository from "../repositories/images-repository.js";

class ProductService {
  constructor(ProductRepository, imgsService) {
    this.ProductRepository = ProductRepository;
    this.imgsService = imgsService;
  }
  async post(validator) {
    try {
      const { name, categoryId, description, price, stock, active, slug } =
        validator;

      const product = await this.ProductRepository.create({
        name,
        categoryId,
        price,
        description,
        stock,
        active,
        slug,
      });
      const imgs = await this.imgsService.postArray(validator.imgs);

      console.log('imgs', imgs)

      const imgs_url = imgs.map(i => i.url);

      const imgs_model = imgs_url.map(i => ({
        url: i,
        productId: product.id
      }))

      const img = await imagesRepository.create(imgs_model);

      return {
        product,
        img,
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
    console.log('product raw', product_raw)
    const imgs = await imagesRepository.findManyByProductIds([product_raw.id]);
    const product = product_raw;
    product.imgs = imgs
    return product;
   } catch (error) {
    console.log(error)
    throw error;
   } 
  }
}

import ProductRepository from "../repositories/products-repository.js";
import ImagesServices from "./imgsService.js";

export default new ProductService(
  ProductRepository,
  ImagesServices,
);
