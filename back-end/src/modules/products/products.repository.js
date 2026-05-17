export default class ProductsRepository{
    constructor(Provider, CacheProvider){
        this.Provider = Provider;
        this.CacheProvider = CacheProvider;
    }

    async create(product){
        const result = await this.Provider.create(product);
        return result;
    }

    async findManyProductsByCategoryId(categoryId){
        const cache = await this.CacheProvider.findManyProductsByCategoryId(categoryId);
        if(cache && cache.length > 0){
            return cache;
        }
        return await this.Provider.findManyProductsByCategoryId(categoryId)
    }

    async findById(id){
        const cache = await this.CacheProvider.findById(id);
        if(cache){
            return cache
        }
        return await this.Provider.findById(id);
    }

    async findByName(name){
        return await this.Provider.findByName(name);
    }
}