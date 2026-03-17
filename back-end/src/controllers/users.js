import usersService from "../services/usersService.js";
import usersValidator from "../validators/usersValidator.js";

class UserController {
  constructor(controller) {
    this.Controller = controller;
  }

  async post(req, res) {
    console.log("cookies", req.cookies);

    return this.Controller(
      req,
      res,
      usersValidator.post.bind(usersValidator),
      usersService.post.bind(usersService),
      [
        {
          name: "access-token",
          value: "Tokens.access_token",
          config: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60,
          },
        },
         {
          name: "refresh-token",
          value: "Tokens.refresh_token",
          config: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 7 * 60 * 60,
          },
        }
      ]
    );
  }

  async get(req, res) {
    return await this.Controller(
      req,
      res,
      usersValidator.get.bind(usersValidator),
      usersService.get.bind(usersService),
      [
        {
          name: "access-token",
          value: "Tokens.access_token",
          config: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60,
          },
        },
         {
          name: "refresh-token",
          value: "Tokens.refresh_token",
          config: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 7 * 60 * 60,
          },
        }
      ]
    );
  }
}

import Controller from "../utils/controllerModelClass.js";

export default new UserController(Controller);
