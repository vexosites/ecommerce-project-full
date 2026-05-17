import AppError from "../../shared/errors/UserError.js";

export class ProductsController {
  constructor(validator, UseCases) {
    this.validator = validator;
    this.UseCases = UseCases;
  }
  async post(req, res, next) {
  try {
    const VALIDATOR = this.validator.post(req);
    const RESULT = await this.UseCases.createProduct.execute(VALIDATOR);

    return res.status(201).json({ result: RESULT });

  } catch (error) {

    if (error instanceof AppError) {
      console.log("err", error)
      switch (error.code) {
        case 'INVALID_DATA/':
          return res.status(400).json({
            message: error.message
          });

        case 'UNIQUE_CONSTRAIN_FAILED/':
          return res.status(409).json({
            message: error.message
          });

        default:
          return next(error);
      }
    }

    return next(error);
  }
}
  async getByName(req, res, next) {
      try {
      const VALIDATOR = this.validator.getByName(req);
      const RESULT = await this.UseCases.getByName(VALIDATOR);

      return res.status(200).json({result: RESULT});
    } catch (error) {
         if(error instanceof AppError) {
        switch (error.code) {
          case 'INVALID_DATA/':
           return res.status(400).json({message: error.message});
          case 'PRODUCT_NOT_FOUND/':
           return res.status(404).json({message: error.message})
          default:
            return error;
        }
        return next(error);
      }
    }
  }
    
  async getById(req, res, next){
    try {
      const VALIDATOR = this.validator.getById(req);
      const RESULT = await this.UseCases.getById(VALIDATOR);

      return res.status(200).json({result: RESULT});
    } catch (error) {
         if(error instanceof AppError) {
        switch (error.code) {
          case 'INVALID_DATA/':
           return res.status(400).json({message: error.message});
          case 'PRODUCT_NOT_FOUND/':
           return res.status(404).json({message: error.message})
          default:
            return error
        }
        return next(error);
      }
    }
  }
  async getManyProductsByCategoryId(req, res, next){
    try {
      const validator = this.validator.getManyProductsByCategoryId(req);
      const result = await this.UseCases.getManyProductsByCategoryId.execute(validator);
      return res.status(200).json({result});
    } catch (error) {
           if(error instanceof AppError) {
        switch (error.code) {
          case 'INVALID_DATA/':
           return res.status(400).json({message: error.message});
          case 'PRODUCT_NOT_FOUND/':
           return res.status(404).json({message: error.message})
          default:
            return next(error);
        }
      }
      return next(error)
    }
  }
}