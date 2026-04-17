import AppError from "../errors/UserError.js";

export default class CartValidator{
    postItem(req){
        const {userId} = req.cookies;
        console.log(userId)
        const {cartId, quantity, productId} = req.body;
        if(!userId || !id){
            throw new AppError('invalid data', 400)
        }
        return {
            userId,
            cartId,
            productId,
            quantity
        }
    }
}