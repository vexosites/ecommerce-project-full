class ProductsRepository{
    constructor(orm){
        this.orm = orm;
    }

    async create(product){
        const result = await this.orm.create(product);
        return result;
    }

    async findByCategoryId(categoryId){
        return await this.orm.findByCategoryId(categoryId)
    }

    async findByName(name){
        return await this.orm.findByName(name);
    }
}

import PrismaProducts from "../../infra/Prisma/PrismaProducts.js";

export default new ProductsRepository(PrismaProducts);