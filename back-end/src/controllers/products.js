import productsService from "../services/productsService.js";
import productsValidator from "../validators/productsValidator.js";
import ImagesProductService from "../services/ImagesProductService.js"
import ImagesProductValidator from "../validators/ImagesProductValidator.js";

class ProductController {
  constructor(controller) {
    this.Controller = controller
  }
  async postImgs(req, res){
    return await this.Controller(req, res, ImagesProductValidator.post.bind(ImagesProductValidator), ImagesProductService.create.bind(ImagesProductService))
  }
  async post(req, res) {
    return await this.Controller(req, res, productsValidator.post.bind(productsValidator), productsService.post.bind(productsService));
  }
  async get(req, res) {
    return await this.Controller(req, res, productsValidator.get.bind(productsValidator), productsService.get.bind(productsService));
  }
  async getById(req, res){
    return await this.Controller(req, res, productsValidator.getById.bind(productsValidator), productsService.getById.bind(productsService))
  }
}

import Controller from "../utils/controllerModelClass.js";

export default new ProductController(Controller);