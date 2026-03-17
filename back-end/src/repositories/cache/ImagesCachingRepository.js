class ImagesCachingRepository {
  constructor(cacheProvide) {
    this.cacheProvide = cacheProvide;
  }
  async create(images) {
    const result = await this.cacheProvide.create(images);
    return result;
  }
}

import imagesRedisRepository from '../../infra/redis/images-redis-repository.js';

export default new ImagesCachingRepository(imagesRedisRepository);