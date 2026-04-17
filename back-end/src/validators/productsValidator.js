import AppError from "../errors/UserError.js";

class ProductsValidator {
  post(req) {
    console.log('validator', req.body);

    const {name, price, stock, categoryId, slug, description} = req.body;

    if(!name || price === null|| stock === null || !categoryId || !slug) {
      throw new AppError('invalid data', 400)
    }

    return { name, description, price, stock, categoryId, slug};
  }
  get(req){
    const { name } = req.params;
    return name;
  }
  getById(req){
    return {id: parseInt(req.params.id)}
  }
}

export default new ProductsValidator();
