

class PrismaUsers{
    constructor(PrismaClient){
        this.PrismaClient = PrismaClient
    }
    async create(data){
        console.log('prisma', data)
        const result = await this.PrismaClient.user.create({
            data:{
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                password: data.password
            }
        })
        return result
    }

    async findByEmail(email){
        const result = await this.PrismaClient.user.findUnique({
         where: {
            email: email
         }
        })
        return result
    }
}

import PrismaClient from "./Prisma-client.js";

export default new PrismaUsers(PrismaClient);