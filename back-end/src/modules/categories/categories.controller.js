import AppError from "../../shared/errors/UserError.js";

export class CategoriesController {
  constructor(validator, useCases) {
    this.validator = validator;
    this.useCases = useCases;
  }
  async post(req, res, next) {
      try {
      const VALIDATOR = this.validator.post(req);
      const RESULT = await this.useCases.createCategory.execute(VALIDATOR);
      console.log('result', RESULT)

      return res.status(201).json({result: RESULT});
    } catch (error) {
         if(error instanceof AppError) {
        switch (error.code) {
          case 'INVALID_DATA/':
           return res.status(400).json({message: error.message});
          case 'UNIQUE_CONSTRAIN_FAILED/':
           return res.status(409).json({message: error.message});
        }
      }
      return next(error)
    }
  }
  async get(req, res) {
      try {
      const VALIDATOR = this.validator.getByCategoryId(req);
      const RESULT = await this.useCases.getById.execute(VALIDATOR);

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
        throw error;
      }
    }
  }
  async getAll(req, res, next){
      try {
      const RESULT = await this.useCases.getAll.execute();
      return res.status(200).json({result: RESULT});
    } catch (error) {
      return next(error)
    }
  }
}
