import express from "express";
import { MakeCategoriesModule } from "./categories.composition.js";

const module = MakeCategoriesModule();

const Router = express.Router();

Router.post('/', module.post.bind(module));

Router.get("/:id", module.get.bind(module));

Router.get("/get/all", module.getAll.bind(module))

export default Router;