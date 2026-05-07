export class CategoriesRepository {
  constructor( Provider, CacheProvider ) {
    this.Provider = Provider;
    this.CacheProvider = CacheProvider;
  }

  async create(data) {

    const result = await this.Provider.create({name: data.name, slug: data.slug, parentId: data.parentId});

    return data;
  }

  async findByCategoryId(categoryId) {
    const cache = await this.CacheProvider.findByCategoryId(categoryId);
    console.log('cache', cache)
    if (cache && cache?.length > 0) {
      return cache;
    }
    const result = await this.Provider.findByCategoryId(categoryId);
    console.log('products', products)
    if(products.length < 1){
      return result;
    }
    await this.CacheProvider.set(products);
    return products;
  }
 
  async findAll(){
    const result = await this.Provider.findAll();
    return result
  }
}