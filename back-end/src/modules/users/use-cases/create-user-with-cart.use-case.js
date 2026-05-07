export class CreateUserWithCartUseCase{
    constructor(CreateUserWithCartTransaction, AuthService){
        this.CreateUserWithCartTransaction = CreateUserWithCartTransaction;
        this.AuthService = AuthService
    }
    async execute(data){
        const result = await this.CreateUserWithCartTransaction.execute({
            name: data.name,
            email: data.email,
            password: data.password, 
            cpf: data.cpf
        })
          const payload = {
            userId: result.user.id,
            name: result.user.name,
            email: result.user.email
        }
        const tokens = await this.AuthService.generateTokens(payload);
        return {
            result: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email
            },
            tokens
        };
    }
};