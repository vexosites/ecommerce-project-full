import AppError from '../errors/UserError.js';
import CartRepository from '../repositories/cart-repository.js'
import PrismaCart from '../infra/Prisma/PrismaCart.js';

export default class CartService extends CartRepository{
    constructor(){
        super(PrismaCart)
    }
    async addItem(item){
        const result = await super.create(item);
        return result;
    }
}