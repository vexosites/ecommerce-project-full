import AppError from "../errors/UserError.js";

class ProductsValidator {
  post(req) {
    const { name, slug, parentId } = req.body;
    if (!name || !slug) {
      throw new AppError("invalid data", 400);
    }
    return { name, slug, parentId };
  }
  get(req) {
    return parseInt(req.params.id);
  }
}

export default new ProductsValidator();