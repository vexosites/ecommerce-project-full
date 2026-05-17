import { CategoriesController } from './categories.controller.js';
import { CategoriesValidator } from './categories.validator.js';
import { CategoriesRepository } from './categories.repository.js'
import { CreateCategoryUseCase } from './use-cases/create-category.use-case.js';
import { GetCategoryUseCase } from './use-cases/get-category-by-id.use-case.js'
import CategoriesPrismaRepository from '../../infra/Prisma/repositories/PrismaCategories.js'
import quickSort from "../../shared/utils/quickSort.js";
import { GetAllCategoriesUseCase } from './use-cases/get-all-categories.use-case.js';
import categoriesRedisRepository from '../../infra/redis/categories-redis-repository.js';

export function MakeCategoriesModule(){
    const VALIDATOR = new CategoriesValidator();
    const prismaRepository = CategoriesPrismaRepository;
    const redisRepository = categoriesRedisRepository;
    const REPOSITORY = new CategoriesRepository(prismaRepository, redisRepository);
    const createCategory = new CreateCategoryUseCase(REPOSITORY);
    const getCategory = new GetCategoryUseCase();
    const getAll = new GetAllCategoriesUseCase(REPOSITORY);
    const USE_CASES = {createCategory, getCategory, getAll};
    const controller = new CategoriesController(VALIDATOR, USE_CASES);
    return controller;
}