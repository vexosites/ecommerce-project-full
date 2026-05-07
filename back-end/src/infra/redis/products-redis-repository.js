class ProductsRedisRepository {
  constructor(redisProvide, categoryRedis) {
    (this.redisProvide = redisProvide), (this.categoryRedis = categoryRedis);
    this.product_convert = function (product) {
      return {
        id: String(product.id),
        name: product.name,
        price: String(product.price),
        stock: String(product.stock),
        slug: product.slug,
        description: product.description,
        categoryId: String(product.categoryId),
        active: String(true),
      };
    };
  }
  async create(product) {
    let productRedis = await this.redisProvide.hGetAll(`product:${String(product.id)}`);
    if (Object.keys(productRedis).length === 0) {
      productRedis = await this.redisProvide.hSet(
        `product:${String(product.id)}`,
        this.product_convert(product)
      );
    }
    const category = await this.categoryRedis.create(
      String(product.categoryId)
    );
    let productName = await this.redisProvide.hGetAll(
      `product-name:${product.name}`
    );
    if (Object.keys(productName).length === 0) {
      productName = await this.redisProvide.hSet(
        `product-name:${product.name}`,
        { productId: String(product.id) }
      );
      return { productRedis, productName };
    }
    productName = await this.redisProvide.hSet(`product-name:${product.name}`, { id: String(product.id)});
    return { productRedis, productName };
  }
  async findByCategoryId(categoryId) {
    const category = await this.categoryRedis.findByCategoryId(
      String(categoryId)
    );
    if(!category){
        return null
    }
    const keys = category.map(id => `product:${String(id)}`);
    const products = await this.redisProvide.mGetAll(keys);
    return products;
  }
  async set(products) {
    const pipeline = this.redisProvide.multi();
  
    for (const product of products) {
      pipeline.hSet(`product:${String(product.id)}`, this.product_convert(product));
    }
  
    const result = await pipeline.exec();
    return result;
  }  
  async findByCategoryId(categoryId){
    const category = await this.redisProvide.hGetAll(`category:${categoryId}`);
    if(Object.keys(category).length === 0){
        return null
    }
    console.log('category', category)
    return category;
}
async findById(id){
  const result = await this.redisProvide.hGet(`products:${id}`);
  return result
}
}

import redisClient from "../redisClient.js";
import categoriesRedisRepository from "./categories-redis-repository.js";

export default new ProductsRedisRepository(
  redisClient,
  categoriesRedisRepository
);
