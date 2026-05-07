import { UsersRepository } from './users.repository.js';
import { CreateUserWithCartUseCase } from './use-cases/create-user-with-cart.use-case.js'
import { GetUserUseCase } from './use-cases/get-user.use-case.js';
import PrismaUsersRepository from '../../infra/Prisma/repositories/PrismaUsers.js';
import { UsersController } from './users.controller.js';
import { UsersValidator } from './users.validator.js';
import { MakeAuthModule } from '../auth/auth.composition.js';
import PrismaTransactionUserAndCart from '../../infra/Prisma/repositories/PrismaTransactionUserAndCart.js'
import { MakeCookiesModule } from '../../shared/composition/cookies.composition.js';

export function MakeUserModule() {
  const VALIDATOR = new UsersValidator();
  const prismaRepository = PrismaUsersRepository;
  const REPOSITORY = new UsersRepository(prismaRepository);
  const AUTH_SERVICE = MakeAuthModule();
  const getUser = new GetUserUseCase(REPOSITORY, AUTH_SERVICE);
  const prismaTransactionUserAndCart = PrismaTransactionUserAndCart;
  const createUserWithCart = new CreateUserWithCartUseCase(prismaTransactionUserAndCart, AUTH_SERVICE);
  const COOKIESSERVICE = MakeCookiesModule()

  const USECASES = {
    getUser,
    createUserWithCart
  };

  const controller = new UsersController(VALIDATOR, USECASES, COOKIESSERVICE);
  return controller;
}