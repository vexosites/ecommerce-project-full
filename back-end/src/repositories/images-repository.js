export class Products_repository {
  constructor({ db_orm, cache_orm }) {
    this.db_orm = db_orm;
    this.cache_orm = cache_orm;
  }

  async create(images) {
    try {
      console.log('images', images)
      const data = await this.db_orm.create(images);

      const imgs = {
        urls: images.map(i => i.url),
        productId: images.productId
      }
      const cache = await this.cache_orm.create(imgs);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findManyByProductIds(ids){
    try {
      const imgs = await this.db_orm.findManyByProductIds(ids);
      return imgs
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByName(user) {}
}

import ImagesRepository from "./db/ImagesRepository.js";
import RedisOmProducts from "./cache/ImagesCachingRepository.js";

export default new Products_repository({
  db_orm: ImagesRepository,
  cache_orm: RedisOmProducts,
});
