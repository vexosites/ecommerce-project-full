export class Products_repository {
  constructor({ db_orm, cache_orm }) {
    this.db_orm = db_orm;
    this.cache_orm = cache_orm;
  }

  async create(urls, productId) {
    try {
      console.log('images', urls)
            const imgs = urls.map(i => {
              return {
              url: i.url,
              productId
    }} )
      
      console.log('imgs', imgs)
      const data = await this.db_orm.create(imgs);

      const cache = await this.cache_orm.create(imgs);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findByProductId(productId){
    const data = await this.db_orm.findByProductId(productId);
    return data
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
