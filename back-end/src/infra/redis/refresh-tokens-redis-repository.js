class RefreshTokensRedisRepository{
    constructor(redisProvide, categoryIndex){
        this.redisProvide = redisProvide
    }
    async create(token){
        const result = await this.redisProvide.hSet(`token:${token.id}`, {
            id: String(token.id),
            token: token.token,
            userId: String(token.userId)
        });
        console.log('redis', result)
        await this.redisProvide.set(`token-user-id:${String(token.userId)}`, String(token.userId));
        return result;
    }
}

import redisClient from "../redisClient.js";

export default new RefreshTokensRedisRepository(redisClient)