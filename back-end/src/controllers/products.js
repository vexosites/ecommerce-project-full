import productsService from "../services/productsService.js";
import productsValidator from "../validators/productsValidator.js";

class ProductController {
  constructor(controller) {
    this.Controller = controller
  }
  async post(req, res) {
    return await this.Controller(req, res, productsValidator.post.bind(productsValidator), productsService.post.bind(productsService));
  }
  async get(req, res) {
    return await this.Controller(req, res, productsValidator.get.bind(productsValidator), productsService.get.bind(productsService));
  }
}

import Controller from "../utils/controllerModelClass.js";

export default new ProductController(Controller);