import { ProductsController } from './products.controller.js';
import { GetManyProductsByCategoryIdUseCase } from './use-cases/get-products-by-categoryId.js';
import { ProductsValidator } from './products.validator.js';
import RedisProductsRepository from '../../infra/redis/products-redis-repository.js'
import PrismaProductsRepository from '../../infra/Prisma/repositories/PrismaProducts.js'
import ProductsRepository from './products.repository.js';
import { CreateProductUseCase } from './use-cases/create-product.use-case.js';

export function MakeProductsModule(){
    const VALIDATOR = new ProductsValidator();
    const prismaProductsRepository = PrismaProductsRepository;
    const redisProductsRepository = RedisProductsRepository;
    const REPOSITORY = new ProductsRepository(prismaProductsRepository, redisProductsRepository);
    const getManyProductsByCategoryId = new GetManyProductsByCategoryIdUseCase(REPOSITORY);
    const createProduct = new CreateProductUseCase(REPOSITORY);
    const UseCases = {getManyProductsByCategoryId, createProduct};
    const controller = new ProductsController(VALIDATOR, UseCases);
return controller;
}