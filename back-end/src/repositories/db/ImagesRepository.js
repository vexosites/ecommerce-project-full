class ImagesRepository {
  constructor(Images) {
    this.Images = Images;
  }
  async create(imgsArray) {

    return await this.Images.createMany(imgsArray);
  }
    async findManyByProductIds(ids){
    return await this.Images.findManyByProductIds(ids);
  }
    async findByProductId(productId){
    const data = await this.Images.findByProductId(productId);
    return data
  }

}

import PrismaImagens from "../../infra/Prisma/PrismaImagens.js";

export default new ImagesRepository(PrismaImagens);
