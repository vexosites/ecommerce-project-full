import express from "express";
import upload from "../middlewares/multerUpload.js";
import ProductController from "../controllers/products.js";
import JwtAuth from "../middlewares/auth/JwtAuth.js";

const Router = express.Router();

Router.post(
  "/",
  JwtAuth.adminAuth.bind(JwtAuth),
  upload.array("file"),
  ProductController.post.bind(ProductController)
);

Router.get("/:name", ProductController.get.bind(ProductController));

export default Router;
