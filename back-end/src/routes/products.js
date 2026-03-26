import express from "express";
import ProductController from "../controllers/products.js";
import JwtAuth from "../middlewares/auth/JwtAuth.js";

const Router = express.Router();

Router.post("/", JwtAuth.adminAuth.bind(JwtAuth), ProductController.post.bind(ProductController));

Router.get("/:name", ProductController.get.bind(ProductController));

export default Router;
