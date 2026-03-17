import ProductsCachingRepository from "./ProductsCachingRepository.js";

class CategoriesCachingRepository{
    constructor(cacheProvide){
        this.cacheProvide = cacheProvide;
    }
    async findByCategoryId(categoryId){
    const result = await ProductsCachingRepository.findByCategoryId(String(categoryId));
    return result;
  }
  async findAll(){
  return await this.ProductsCachingRepository.findAll();
  }
  async set(products){
    const result = await ProductsCachingRepository.set(products);
    console.log('result', result)
    return result
  }
}

import categoriesRedisRepository from "../../infra/redis/categories-redis-repository.js";

export default new CategoriesCachingRepository(categoriesRedisRepository);