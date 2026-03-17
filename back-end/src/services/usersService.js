import AppError from "../errors/UserError.js";

class UserService{
constructor(userRepository, tokenService){
this.UserRepository = userRepository;
this.TokenService = tokenService;
}
async post(validator){
try {
    console.log('validator', validator)
    const user = await this.UserRepository.create({
        name: validator.name,
        email: validator.email,
        password: validator.password,
        cpf: validator.cpf
    })

    console.log('user', user)

    const payload = {
        id: user.id, 
        name: user.name,
        email: user.email
    }

    const tokens = await this.TokenService.generate(payload);

    console.log('tokdenss', tokens)

    const result = {
        status: 201,
        user,
        Tokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        }
    }

    return result
} catch (error) {
    if(error.code == 'P2002') {
        throw new AppError("user already exists", 403)
    }
    throw error;
}
};

async get(validator){
    try {
        const user = await this.UserRepository.findByEmail(validator.email);
        if(!user) { 
            throw new AppError("user not found", 404);
        }
        if(user.password !== validator.password) { 
            throw new AppError("invalid credentiais", 401);
        }
        
        const payload = {
            id: user.id, 
            name: user.name,
            email: user.email
        }

        const tokens = await this.TokenService.generate(payload);
        
        const result = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            Tokens: {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token
            }
        }
    
        return result
    } catch (error) {
        throw error;
    }
}
}

import UsersRepository from "../repositories/users-repository.js";
import TokenService from "./TokensService.js";

export default new UserService(
UsersRepository,
TokenService
);