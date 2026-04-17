export class Products_repository {
  constructor({ db_orm, cache_orm }) {
    this.db_orm = db_orm;
    this.cache_orm = cache_orm;
  }

  async create(product) {
    try {
      const data = await this.db_orm.create(product);

      const cache = await this.cache_orm.create(product);

      return data;
    } catch (error) {
      throw error;
    }
  }
  async findById(id){
    const data = await this.db_orm.findById(id);
    return data
  }
  async findByName(name) {
    try {
      const product = await this.db_orm.findByName(name);
      return product;
    } catch (error) {
      throw error
    }
  }
}

import productsRepository from "./db/ProductsRepository.js";
import RedisOmProducts from "./cache/ProductsCachingRepository.js";

export default new Products_repository({
  db_orm: productsRepository,
  cache_orm: RedisOmProducts,
});
