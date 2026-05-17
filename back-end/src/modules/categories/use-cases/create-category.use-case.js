import AppError from "../../../shared/errors/UserError.js";

export class CreateCategoryUseCase {
  constructor(CategoriesRepository){
    this.CategoriesRepository = CategoriesRepository;
  }
  async execute(data) {
    try {
      const result = await this.CategoriesRepository.create({
        name: data.name,
        slug: data.slug,
        parentId: data.parentId
      });
      return result;
    } catch (error) {
      console.log('err', error);
      if(error.code = "P2002") throw new AppError('category already existis', "UNIQUE_CONSTRAIN_FAILED/");
      throw error;
    }
  }
}