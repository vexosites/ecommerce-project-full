
import CartService from "./cart.service.js";
import CartValidator from "./cart.validator.js";

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

import Controller from "../../shared/utils/controllerModelClass.js";

export default new CartController(
  Controller
);
