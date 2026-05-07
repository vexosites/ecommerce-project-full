export class CreateUserAndCartUseCase{
    constructor(TransactionProvider, AuthService){
        this.TransactionProvider 
        this.AuthService = AuthService
    }
    async execute(userData){
        const user = await this.TransactionProvider.createUserAndCart(userData).user;
        
        const payload = {
        id: user.id, 
        name: user.name,
        email: user.email
    }

    const tokens = await this.AuthService.generate(payload);

    const result = {
        status: 201,
        payload,
        Tokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        }
    }

        return result
    }
}