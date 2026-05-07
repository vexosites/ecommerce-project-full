import express from "express";
import JwtAuth from "../../shared/middlewares/auth/JwtAuth.js";
import upload from "../../shared/middlewares/multerUpload.js";

import { MakeImagesModule } from "./ProductImages.composition.js";

const module = MakeProductsModule();

const Router = express.Router();

Router.post("/:productId", upload.array("img"), module.create.bind(module));

export default Router;