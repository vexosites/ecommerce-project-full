export class AuthRepository {
  constructor(Provider, CacheProvider) {
    this.Provider = Provider;
    this.CacheProvider = CacheProvider;
  }

  async create(RefreshToken) {
      const data = await this.Provider.create(RefreshToken);

      const cache = await this.CacheProvider?.create(data);

      return data;
  }
  
  async findByUserId(userId){

    const cache = await this.CacheProvider.findByUserId(userId);
    if(cache?.lenght < 1){
      return cache;
    }
    const result = await this.Provider.findByUserId(userId);

    return result;
  }

  async deleteByUserId(userId){
    const result = await this.Provider.deleteByUserId(userId)
    return result;
  }

  async findByName(user) {}
}