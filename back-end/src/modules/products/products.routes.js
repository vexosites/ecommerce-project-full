import express from "express";
import JwtAuth from "../../shared/middlewares/auth/JwtAuth.js";
import upload from "../../shared/middlewares/multerUpload.js";
import { MakeProductsModule } from "./products.composition.js";

const module = MakeProductsModule();

const Router = express.Router();

Router.post("/", module.post.bind(module));

Router.get("/:name", module.getByName.bind(module));

Router.get("/byId/:id", module.getById.bind(module));

Router.get("/categories/:categoryId", module.getManyProductsByCategoryId.bind(module));

export default Router;