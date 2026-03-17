import productsRepository from "./ProductsRepository.js";

class CategoriesRepository {
  constructor(CategoriesRepository) {
    this.CategoriesRepository = CategoriesRepository;
  }
  async create(category) {
    return await this.CategoriesRepository.create(category);
  }
  async findByCategoryId(categoryId){
    return await productsRepository.findByCategoryId(categoryId)
}
async findAll(){
  return await this.CategoriesRepository.findAll();
}
}

import PrismaCategories from "../../infra/Prisma/PrismaCategories.js";

export default new CategoriesRepository(PrismaCategories);