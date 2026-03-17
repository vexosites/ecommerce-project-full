class RefreshTokenRepository {
  constructor(RefreshTokens) {
    this.RefreshTokens = RefreshTokens;
  }
  async create(token) {
    const result = await this.RefreshTokens.create(token);
    return result;
  }
  async findByUserId(userId) {
    const result = await this.RefreshTokens.findByUserId(userId);
    return result;
  }
  async deleteByUserId(userId) {
    const result = await this.RefreshTokens.deleteByUserId(userId);
    return result;
  }
}

import PrismaRefreshTokens from "../../infra/Prisma/PrismaRefreshTokens.js";

export default new RefreshTokenRepository(PrismaRefreshTokens);
