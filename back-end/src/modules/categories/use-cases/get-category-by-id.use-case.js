export class GetCategoryUseCase{
    constructor(CategoryRepository){
        this.CategoryRepository = CategoryRepository;
    }
    async execute(data){
        try {
            const RESULT = await this.CategoryRepository.getById(data.name);
            if(!RESULT || RESULT.length === 0);
            return RESULT;
        } catch (error) {
            throw error;
        }
    }
} 