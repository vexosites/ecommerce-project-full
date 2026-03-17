class PrismaRefreshTokens {
  constructor(PrismaClient, Prisma) {
    this.PrismaClient = PrismaClient;
    this.Prisma = Prisma
  }
  async create(refreshToken) {
      console.log("refreshToken", refreshToken);
      const result = await this.PrismaClient.RefreshToken.create({
        data: {
          token: refreshToken.token,
          userId: refreshToken.userId,
        },
      });
      return result;
  }
  async deleteByUserId(userId) {
    const result = await this.PrismaClient.RefreshToken.deleteMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }
}

import PrismaClient from "../../../prisma/prisma-client.js";
import { Prisma } from "../../generated/prisma/client.js";

export default new PrismaRefreshTokens(PrismaClient, Prisma);
