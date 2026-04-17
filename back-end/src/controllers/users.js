import UsersService from "../services/usersService.js";
import UsersValidator from "../validators/usersValidator.js";
import UsersRepository from "../repositories/users-repository.js";
import TokenService from "../services/TokensService.js";
import Controller from "../utils/controllerModelClass.js";
import UserAndCartService from "../services/CreateUserAndCartService.js";

class UserController {
  constructor(controller) {
    this.Controller = controller;

    // instâncias (injeção correta)
    this.UserAndCartService = new UserAndCartService()
    this.validator = UsersValidator;
    this.service = new UsersService(
      UsersRepository,
      TokenService
    );
  }

  async post(req, res) {
    return this.Controller(
      req,
      res,
      this.validator.post.bind(this.validator),
      this.UserAndCartService.createUserAndCart.bind(this.UserAndCartService),
      [
        {
          name: "access-token",
          value: (result) => result.access_token,
          config: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60,
          },
        },
        {
          name: "refresh-token",
          value: (result) => result.refresh_token,
          config: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 7 * 60 * 60,
          },
        },
      ]
    );
  }

  async get(req, res) {
    return this.Controller(
      req,
      res,
      this.validator.get.bind(this.validator),
      this.service.get.bind(this.service),
      []
    );
  }
}

export default new UserController(Controller);