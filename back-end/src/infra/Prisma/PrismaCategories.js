class PrismaCategories {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }
  async create(data) {
    try {
      const category = await this.prismaClient.Category.create({
        data: {
          name: data.name,
          slug: data.slug,
        },
      });
      return category;
    } catch (error) {
      throw error;
    }
  }
  async findAll(){
    const result = await this.prismaClient.Category.findMany({
      where: {

      }
    });
    console.log('categories',  result)
    return result
  }
}

import PrismaClient from "../../../prisma/prisma-client.js";

export default new PrismaCategories(PrismaClient);
