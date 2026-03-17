import AppError from "../errors/UserError.js";

class ProductsValidator {
  post(req) {
    const { name, slug } = req.body;
    if (!name || !slug) {
      throw new AppError("invalid data", 400);
    }
    return { name, slug };
  }
  get(req) {
    return parseInt(req.params.id);
  }
}

export default new ProductsValidator();