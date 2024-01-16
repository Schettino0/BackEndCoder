import { Router } from "express";

import userRouter from "../routes/user.router.js";
import productsRouter from "../routes/products.router.js";
import viewRouter from "../routes/views.router.js";
import chatRouter from "../routes/chat.router.js";
import cartsRouter from "../routes/carts.router.js";

const router = Router();

router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/user", userRouter);
router.use("/chat", chatRouter);
router.use("/", viewRouter);
export default router;
