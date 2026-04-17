import express from "express";
import users from "./routes/users.js";
import products from "./routes/products.js";
import categories from "./routes/categories.js";
import cart from "./routes/cart.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors())

app.use(errorHandler)

app.get("/", (req, res) => res.send("Server running!"));

app.use("/users", users);

app.use("/products", products);

app.use("/categories", categories);

app.use('/cart', cart)

export default app;
