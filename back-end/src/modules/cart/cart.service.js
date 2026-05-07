import AppError from '../../shared/errors/UserError.js';
import CartRepository from './cart.repository.js'
import PrismaCart from '../../infra/Prisma/repositories/PrismaCart.js';

export default class CartService extends CartRepository{
    constructor(){
        super(PrismaCart)
    }
    async addItem(item){
        const result = await super.create(item);
        return result;
    }
}