export class UsersRepository {
  constructor(Provider, CacheProvider) {
    this.Provider = Provider;
    this.CacheProvider = CacheProvider;
  }

  async create(user) {
    try {
      const data = await this.Provider.create(user);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email) {
    const result = await this.Provider.findByEmail(email);
    return result;
  }
}