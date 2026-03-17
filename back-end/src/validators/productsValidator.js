import AppError from "../errors/UserError.js";

class ProductsValidator {
  post(req) {
    console.log(req.body.product);

    const json_body = JSON.parse(req.body.product);

    console.log('json-body', json_body)

    const { name, description, price, active, stock, categoryId, slug } =
      json_body;

    const imgs = req.files;

    console.log(imgs);
    if (!name || !description || !price || !active || !stock || !categoryId) {
      throw new AppError("invalid body", 400);
    }
    return { name, description, price: Number(price), active, stock: Number(stock), categoryId: Number(categoryId), slug, imgs };
  }
  get(req){
    const { name } = req.params;
    return name;
  }
}

export default new ProductsValidator();
