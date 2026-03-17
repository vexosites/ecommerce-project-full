import imagesRepository from "./images-repository.js";

class CategoriesRepository {
  constructor({ db_orm, cache_orm }) {
    this.db_orm = db_orm;
    this.cache_orm = cache_orm;
  }

  async create(category) {

    const data = await this.db_orm.create(category);

    return data;
  }

  async findByCategoryId(categoryId) {
    const cache = await this.cache_orm.findByCategoryId(categoryId);
    console.log('cache', cache)
    if (cache && cache.length > 0) {
      return cache;
    }
    const products = await this.db_orm.findByCategoryId(categoryId);
    console.log('products', products)
    if(products.length < 1){
      return null;
    }
    await this.cache_orm.set(products);
    return products;
  }

  async findManyByProductIds(ids){
    return await imagesRepository.findManyByProductIds(ids);
  }
 
  async findAll(){
    const result = await this.db_orm.findAll();
    return result
  }
  
}

import CategoriesCachingRepository from "./cache/CategoriesCachingRepository.js";
import Categories_repository from "./db/categoriesRepository.js";

export default new CategoriesRepository({
  db_orm: Categories_repository,
  cache_orm: CategoriesCachingRepository
});