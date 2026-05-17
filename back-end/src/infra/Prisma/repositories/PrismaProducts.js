class PrismaProducts{
    constructor(PrismaClient){
        this.PrismaClient = PrismaClient;
    }
async create(product){
return await this.PrismaClient.product.create({
    data: {
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        price: product.price,
        stock: product.stock,
        slug: product.slug,
        active: product.active
    }
})
}
async findManyProductsByCategoryId(categoryId){
    const result = await this.PrismaClient.product.findMany({
        where: {
            categoryId: categoryId
        }
    })
    console.log('prismaProducts-result', result)
    return result
}
async findByName(name){
    return await this.PrismaClient.product.findFirst({
        where: {
            name: {
                contains: name
            }
        }
    })
}
async findById(id){
    console.log("iddd", id)
    return await this.PrismaClient.product.findFirst({
        where: {
            id: id
        }
    })
}
}

import PrismaClient from "./Prisma-client.js";

export default new PrismaProducts(PrismaClient);