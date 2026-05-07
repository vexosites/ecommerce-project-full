export class CategoriesController {
  constructor(validator, service) {
    this.validator = validator;
    this.service = service;
  }
  async post(req, res) {
      try {
      const VALIDATOR = this.validator.post(req);
      const RESULT = await this.service.post(VALIDATOR);

      return res.status(201).json({result: RESULT});
    } catch (error) {
         if(error instanceof AppError) {
        switch (error.code) {
          case 'INVALID_DATA/':
           return res.status(400).json({message: error.message});
          case 'UNIQUE_CONSTRAIN_FAILED':
           return res.status(409).json({message: error.message});
          default:
            return error
        }
      }
    }
  }
  async get(req, res) {
      try {
      const VALIDATOR = this.validator.getByCategoryId(req);
      const RESULT = await this.service.getByName(VALIDATOR);

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
      }
    }
  }
  async getAll(req, res){
      try {
      const RESULT = await this.service.getAll();
      return res.status(200).json({result: RESULT});
    } catch (error) {
         if(error instanceof AppError) {
        switch (error.code) {
          case '' :
            return
          default:
            return error
        }
      }
    }
  }
}
