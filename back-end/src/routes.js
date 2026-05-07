import express from "express";
import users from "./modules/users/users.routes.js";
import products from "./modules/products/products.routes.js";
import categories from "./modules/categories/categories.routes.js";
import cart from "./modules/cart/cart.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import errorHandler from "./shared/middlewares/errorHandler.js";
import { RequestLogger } from './shared/middlewares/requestLogger.js'

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors())

app.use(errorHandler)

app.use(RequestLogger)

app.get("/", (req, res) => res.send("Server running!"));

app.use("/users", users);

app.use("/products", products);

app.use("/categories", categories);

app.use('/cart', cart)

export default app;
