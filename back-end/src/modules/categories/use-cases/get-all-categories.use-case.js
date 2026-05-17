import AppError from "../../../shared/errors/UserError.js";

export class GetAllCategoriesUseCase{
    constructor(CategoriesRepository){
        this.CategoriesRepository = CategoriesRepository;
    }
    async execute(){
            const result = await this.CategoriesRepository.findAll();
            return result;
    }
}