import express from "express";
import { MakeUserModule } from "./users.composition.js";

const router = express.Router();
const module = MakeUserModule();

router.post('/', module.post.bind(module));
router.get('/:email/:password', module.get.bind(module));

export default router;