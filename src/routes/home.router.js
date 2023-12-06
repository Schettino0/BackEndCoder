import { Router } from "express";

import * as controllerProduct from "../controllers/product.controller.js";
import * as controllerCart from "../controllers/cart.controller.js";


const router = Router();

router.get("/products", controllerProduct.getAllView)
router.get("/cart/:cid", controllerCart.getCartView)


export default router;
