class ProductsCachingRepository {
  constructor(cacheProvide) {
    this.cacheProvide = cacheProvide;
  }
  async create(product) {
    console.log('productsCachingRepository.js-product', product)
    const result = await this.cacheProvide.create(product);
    return result;
  }
  async set(products){
    const result = await this.cacheProvide.set(products);
    console.log('result', result)
    return result
  }
  async findByCategoryId(categoryId){
    const result = await this.cacheProvide.findByCategoryId(String(categoryId));
    return result;
  }
}

import productsRedisRepository from "../../infra/redis/products-redis-repository.js";

export default new ProductsCachingRepository(productsRedisRepository);