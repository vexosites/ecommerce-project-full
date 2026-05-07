import AppError from "../../shared/errors/UserError.js";

export class UsersController {
  constructor(validators, useCases, cookie) {
    this.validators = validators;
    this.useCases = useCases;
    this.cookies = cookie
  }

  async post(req, res, next) {
    try {
      const VALIDATOR = this.validators.post(req);
      const RESULT = await this.useCases.createUserWithCart.execute(VALIDATOR);
      await this.cookies.send(res, "access-token", RESULT.tokens.accessToken, 15 * 60 * 1000);
      await this.cookies.send(res,  "refresh-token", RESULT.tokens.refreshToken, 15 * 60 * 60 * 1000);
      return res.status(201).json({result: RESULT.result});
    } catch (error) {
      if(error instanceof AppError) {
        switch (error.code) {
          case 'USER_NOT_FOUND':
           return res.status(404).json({message: error.message});
          case 'INVALID_DATA':
           return res.status(400).json({message: error.message});
        }
      }
      return next(error)
    }
  }

  async get(req, res, next) {
  try {
    const VALIDATOR = await this.validators.get(req);
    const RESULT = await this.useCases.getUser.execute(VALIDATOR);
    await this.cookies.send(res, "access-token", RESULT.tokens.accessToken, 15 * 60 * 1000);
    await this.cookies.send(res,  "refresh-token", RESULT.tokens.refreshToken, 15 * 60 * 60 * 1000);
    return res.status(200).json({result: RESULT.result})
  } catch (error) {
    if(error instanceof AppError) {
      switch (error.code) {
        case 'USER_NOT_FOUND':
          return res.status(404).json({message: error.message});
        case 'INVALID_DATA': 
          return res.status(400).json({message: error.message})
      }
    }
    return next(error)
  }
  }
}