import AppError from "../../shared/errors/UserError.js";;

export class ProductsService {
  constructor(ProductsRepository, ImagesRepository) {
    this.ProductsRepository = ProductsRepository;
    this.ImagesProductsRepository = ImagesRepository;
  }
  async post(validator) {
    try {
      const { name, categoryId, description, price, stock, slug } =
        validator;

      const product = await this.ProductsRepository.create({
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
    const product_raw = await this.ProductsRepository.findByName(name);
    if(!product_raw) throw new AppError('product not found', 404)
    const imgs_raw = await this.ImagesProductsRepository.findByProductId(product_raw.id);
    if(imgs_raw.length === 0) {
      
      const product = product_raw.imgs = imgs_raw;
      return product;
    }
    return product_raw;
   } catch (error) {
    console.log(error)
    throw error;
   } 
  }

  async getById(data){
    try {
      const result = await this.ProductsRepository.findById(data.id)
      if(!result){
        return new AppError('product not found', 404);
      }
      const imgs = await this.ImagesProductsRepository.findByProductId(result.id);
      if(imgs.length < 0) {
        return result
      }
      result.imgs = imgs;
      return result 
    } catch (error) {
      console.log('error', error)
      return new AppError('', 500)
    }
  }
}
 