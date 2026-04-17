export default class CartRepository{
    constructor(orm){
        this.orm = orm
    }
    async create(item){
        const {cartId, productId, quantity} = item;
        const result = await this.orm.create({cartId, productId, quantity})
        return result;
    }
}