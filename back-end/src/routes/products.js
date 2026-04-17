import express from "express";
import ProductController from "../controllers/products.js";
import JwtAuth from "../middlewares/auth/JwtAuth.js";
import upload from "../middlewares/multerUpload.js";

const Router = express.Router();

Router.post("/", JwtAuth.adminAuth.bind(JwtAuth), ProductController.post.bind(ProductController));

Router.get("/:name", ProductController.get.bind(ProductController));

Router.get("/byId/:id", ProductController.getById.bind(ProductController))

Router.post("/:productId/images", upload.array('img'), ProductController.postImgs.bind(ProductController))

export default Router;
