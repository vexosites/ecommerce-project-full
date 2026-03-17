
import categoriesService from "../services/categoriesService.js";
import categoriesValidator from "../validators/categoriesValidator.js";

class CategoriesController {
  constructor(Controller) {
    this.Controller = Controller
  }
  async post(req, res) {
    return await this.Controller(req, res, categoriesValidator.post.bind(categoriesValidator), categoriesService.post.bind(categoriesService));
  }
  async get(req, res) {
    return await this.Controller(req, res, categoriesValidator.get.bind(categoriesValidator), categoriesService.get.bind(categoriesService))
  }
  async getAll(req, res){
    return await this.Controller(req, res, null, categoriesService.getAll.bind(categoriesService))
  }
}

import Controller from "../utils/controllerModelClass.js";

export default new CategoriesController(
  Controller
);
