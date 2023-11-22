import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";

const router = Router();
router.get("/", controller.getAll)
router.get("/:id" , controller.getById )
router.post("/", controller.create)
router.delete("/:id", controller.remove)
router.post("/:cid/product/:pid", controller.addProduct)


export default router;
