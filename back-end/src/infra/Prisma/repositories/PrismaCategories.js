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
          parentId: data.parentId
        }
      });
      return category;
    } catch (error) {
      throw error;
    }
  }
  async findAll(){
        const result = await this.prismaClient.category.findMany({
        include: {
          children: true
        }
      });
    console.log('categories',  result)
    return result
  }
}

import PrismaClient from "./Prisma-client.js";

export default new PrismaCategories(PrismaClient);
