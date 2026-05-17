export class UsersRepository {
  constructor(Provider, CacheProvider) {
    this.Provider = Provider;
  }

  async create(user) {
      const result = await this.Provider.create(user);
      return result;
  }

  async findByEmail(email) {
    const result = await this.Provider.findByEmail(email);
    return result;
  }
}