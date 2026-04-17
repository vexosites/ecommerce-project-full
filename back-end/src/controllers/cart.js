
import CartService from "../services/CartService.js";
import CartValidator from "../validators/CartValidator.js";

class CartController {
  constructor(Controller) {
    this.Controller = Controller;
    this.validator = new CartValidator()
    this.service = new CartService()
  }

  async postItem(req, res){
    return this.Controller(
        req,
        res,
        this.validator.postItem.bind(this.validator),
        this.service.postItem.bind(this.service)
    )
  }

}

import Controller from "../utils/controllerModelClass.js";

export default new CartController(
  Controller
);
