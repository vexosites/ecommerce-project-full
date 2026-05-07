class PrismaRefreshTokens {
  constructor(Prisma) {
    this.Prisma = Prisma
  }
  async create(refreshToken) {
      console.log("refreshToken", refreshToken);
      const result = await this.Prisma.RefreshToken.create({
        data: {
          token: refreshToken.token,
          userId: refreshToken.userId,
        },
      });
      return result;
  }
  async deleteByUserId(userId) {
    const result = await this.Prisma.RefreshToken.deleteMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }
}

import Prisma from "./Prisma-client.js";

export default new PrismaRefreshTokens(Prisma);
