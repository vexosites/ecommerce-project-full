import AppError from "../errors/UserError";

class PaymentValidator{
postCheckout(req){
const { userId } = req.cart
return {userId}
}
}

export default new PaymentValidator()