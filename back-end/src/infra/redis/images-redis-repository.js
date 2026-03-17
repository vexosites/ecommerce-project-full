class ImagesRedisRepository{
    constructor(redisProvide, categoryIndex){
        this.redisProvide = redisProvide
        this.categoryIndex = categoryIndex
    }
    async create(product){
        console.log('producttt', product)
        const result = await this.redisProvide.hSet(`product-image:${String(product.productId)}`, {
            urls: JSON.stringify(product.urls),
            productId: String(product.productId)
        });
        return result;
    }
    async findByProductId(id){
        const imgs = await this.redisProvide.hGet(`product-image:${String(id)}`);
        return imgs;
    }
}

import redisClient from "../redisClient.js";

export default new ImagesRedisRepository(redisClient);