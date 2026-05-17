
import AppError from "../../../shared/errors/UserError.js";

export class CreateProductUseCase{
    constructor(ProductsRepository){
        this.ProductsRepository = ProductsRepository;
    }
    async execute(data){
        try {
            const result = await this.ProductsRepository.create(data);
            return result;
        } catch (error) {
            console.log('code', error)
            if(error.code === 'P2003'){
                throw new AppError('unique constrain failed', 'UNIQUE_CONSTRAIN_FAILED/')
            }
            throw error;
        }
    }
}