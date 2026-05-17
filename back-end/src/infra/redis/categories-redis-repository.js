class CategoriesRedisRepository{
    constructor(redisProvide){
        this.redisProvide = redisProvide
    }
    async create(categoryId){
        const result = await this.redisProvide.hSet(`category:${categoryId}`, {productsIds: JSON.stringify([])});
        logger.info(result);
        return result;
    }
    async findCategoryByCategoryId(id){
        return await this.redisProvide.sMembers(
      `category:${String(id)}`
    );
    }
    async findAll(){
        return await this.redisProvide.hGet(`category`);
    }
}

import redisClient from "../redisClient.js";

export default new CategoriesRedisRepository(redisClient);