class CategoriesRedisRepository{
    constructor(redisProvide){
        this.redisProvide = redisProvide
    }
    async create(productId, categoryId){
        const categoryProduct = await this.redisProvide.hSet(`category:${categoryId}`, {productId});
    }
    async findAll(){
        return await this.redisProvide.hGet(`catego`)
    }
}

import redisClient from "../redisClient.js";

export default new CategoriesRedisRepository(redisClient);