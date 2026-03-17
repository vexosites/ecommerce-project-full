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
}

import PrismaImagens from "../../infra/Prisma/PrismaImagens.js";

export default new ImagesRepository(PrismaImagens);
