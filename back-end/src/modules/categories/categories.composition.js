import { CategoriesController } from './categories.controller.js';
import { CategoriesService } from './categories.service.js';
import { CategoriesValidator } from './categories.validator.js';
import { CategoriesRepository } from './categories.repository.js'
import CategoriesPrismaRepository from '../../infra/Prisma/repositories/PrismaCategories.js'
import quickSort from "../../shared/utils/quickSort.js";

export function MakeCategoriesModule(){
    const VALIDATOR = new CategoriesValidator();
    const prismaRepository = CategoriesPrismaRepository;
    const REPOSITORY = new CategoriesRepository(prismaRepository);
    const SERVICE = new CategoriesService(REPOSITORY, quickSort);
    const controller = new CategoriesController(VALIDATOR, SERVICE);
return controller;
}