import { Router } from "express";

import * as controllerProduct from "../controllers/product.controller.js";
import * as controllerCart from "../controllers/cart.controller.js";
import * as controllerUser from "../controllers/user.controller.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { alreadyLogged } from "../middlewares/alreadyLogged.js";

const router = Router();
router.get("/products", validateLogin, controllerProduct.getAllView);
router.get("/profile", validateLogin, controllerUser.perfil);
router.get("/cart/:cid", validateLogin, controllerCart.getCartView);
router.get("/login", alreadyLogged, controllerUser.loginView);
router.get("/logout", controllerUser.logout);

export default router;
