import { AuthService } from "./auth.service.js";
import { TokensProvider } from "./TokensProvider.js";
import joseProvider from "../../infra/jose/joseProvider.js";
import PrismaAuthRepository from '../../infra/Prisma/repositories/PrismaRefreshTokens.js'
import { AuthRepository } from "./auth.repository.js";

export function MakeAuthModule() {
const JOSE_PROVIDER = joseProvider;
const TOKEN_PROVIDER = new TokensProvider(JOSE_PROVIDER);
const prismaAuthRepository = PrismaAuthRepository;
const AUTHREPOSITORY = new AuthRepository(prismaAuthRepository)
const RESULT = new AuthService(TOKEN_PROVIDER, AUTHREPOSITORY);
return RESULT;
}