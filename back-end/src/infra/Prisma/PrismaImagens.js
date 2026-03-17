class PrismaImages {
  constructor(PrismaClient) {
    this.PrismaClient = PrismaClient;
  }
  async createMany(imgs) {
    console.log('imgs-prisma-repository-images', imgs)
    const images = await this.PrismaClient.ProductImage.createMany({
      data: [...imgs],
    });
    if(images.count > 0){
      return imgs
    }
  }
  async findManyByProductIds(ids){
    const imgs = await this.PrismaClient.ProductImage.findMany({
      where: {
        productId: {
          in: ids
        }
      }
    });
    console.log('imgs', imgs);
    return imgs
  }
}

import PrismaClient from "../../../prisma/prisma-client.js";
import products from "../../controllers/products.js";

export default new PrismaImages(PrismaClient);
