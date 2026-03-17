export class Products_repository {
  constructor({ db_orm, cache_orm }) {
    this.db_orm = db_orm;
    this.cache_orm = cache_orm;
  }

  async create(product) {
      const data = await this.db_orm.create(product);

      const cache = await this.cache_orm.create(data);

      return data;
  }
  
  async findByUserId(userId){
    const cache = await this.cache_orm.findByUserId(userId);
    if(cache?.lenght < 1){
      return cache;
    }
    const result = await this.db_orm.findByUserId(userId);

    return result;
  }

  async deleteByUserId(userId){
    const result = await this.db_orm.deleteByUserId(userId)
    return result;
  }

  async findByName(user) {}
}

import RefreshTokenRepository from "./db/RefreshTokenRepository.js";
import cacheRepository from "./cache/RefreshTokensCachingRepository.js";

export default new Products_repository({
  db_orm: RefreshTokenRepository,
  cache_orm: cacheRepository,
});