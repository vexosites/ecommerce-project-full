import AppError from "../../../shared/errors/UserError.js";

export class GetUserUseCase{
    constructor(UsersRepository, AuthService, Logger){
        this.UsersRepository = UsersRepository;
        this.AuthService = AuthService;
        this.Logger = Logger
    }
    async execute(data){
        const result = await this.UsersRepository.findByEmail(data.email);
        if(!result) throw new AppError('user not found', 'USER_NOT_FOUND')
        if(result.password !== data.password) throw new AppError('user not found', 'USER_NOT_FOUND');
        const payload = {
            userId: result.id,
            name: result.name,
            email: result.email,
            role: result.role
        }
        const tokens = await this.AuthService.generateTokens(payload);
        return {
            result: {
                id: result.id,
                name: result.name,
                email: result.email
            },
            tokens
        };
    }
}