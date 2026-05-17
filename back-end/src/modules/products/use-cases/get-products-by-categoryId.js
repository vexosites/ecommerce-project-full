import AppError from "../../../shared/errors/UserError.js";

export class GetManyProductsByCategoryIdUseCase{
    constructor(ProductsRepository){
        this.ProductsRepository = ProductsRepository;
    }
    async execute(data){
        try {
            const RESULT = await this.ProductsRepository.findManyProductsByCategoryId(data.categoryId);
            if(!RESULT || RESULT.length === 0) throw new AppError('products not found', "PRODUCT_NOT_FOUND/");
            return RESULT;
        } catch (error) {
            throw error;
        }
    }
} 