import PrismaTransactionUserAndCart from "../../infra/Prisma/repositories/PrismaTransactionUserAndCart.js";
import PrismaClient from "../../infra/Prisma/repositories/Prisma-client.js"
;

export default class UserAndCartService{
    constructor(){
        this.transactionProvider = new PrismaTransactionUserAndCart(PrismaClient)
        this.TokenService = TokensService
    }
    async createUserAndCart(userData){
        const u = await this.transactionProvider.createUserAndCart(userData);
        const user = u.user

        console.log('user-c', user)
        const payload = {
        id: user.id, 
        name: user.name,
        email: user.email
    }

    const tokens = await this.TokenService.generate(payload);

    const result = {
        status: 201,
        user,
        Tokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        }
    }

        return result
    }
}