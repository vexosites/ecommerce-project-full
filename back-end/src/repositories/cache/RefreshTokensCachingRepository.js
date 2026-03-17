class RefreshTokensCachingRepository {
  constructor(cacheProvide) {
    this.cacheProvide = cacheProvide;
  }
  async set(token){
    const result = await this.cacheProvide.set(token);
    return result;
  }
  async create(token) {
    const result = await this.cacheProvide.create(token);
    return result;
  }
  async findByUserId(userId){
    const result = await this.cacheProvide.findByUserId(userId);
    return result;
  }
}

import RefreshTokensRedisRepository from "../../infra/redis/refresh-tokens-redis-repository.js";

export default new RefreshTokensCachingRepository(RefreshTokensRedisRepository);