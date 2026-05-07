export default class ProductsRepository{
    constructor(Provider, CacheProvider){
        this.Provider = Provider;
        this.CacheProvider = CacheProvider;
    }

    async create(product){
        const db = await this.Provider.create(product);
        return result;
    }

    async findByCategoryId(categoryId){
        const cache = await this.CacheProvider.findByCategoryId(categoryId);
        if(cache){
            return cache;
        }
        return await this.Provider.findByCategoryId(categoryId)
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