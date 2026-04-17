
import  from "../services/Service.js";
import  from "../validators/Validator.js";

class PaymentController {
  constructor(Controller) {
    this.Controller = Controller;
    this.validator = validator;
    this.service = new service();
  }
  async postCheckout(){
    return this.Controller(req, res, 
        this.validator.postCheckout.bind(this.validator), 
        this.service.postCheckout.bind(this.service))
  }
}

import Controller from "../utils/controllerModelClass.js";

export default new PaymentController(
  Controller
);
