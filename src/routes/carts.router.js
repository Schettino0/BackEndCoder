import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";
import * as controllerTicket from "../controllers/ticket.controller.js"

const router = Router();
router.get("/all", controller.getAll);
router.get("/:cid", controller.getCart);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.delete("/:cid/products/:pid", controller.remove);
router.post("/:cid/products/:pid", controller.addProduct);
router.delete("/:cid", controller.removeAll);
router.put("/:cid/products/:pid", controller.cambiarCantidad);
router.get("/:cid/purchase", controllerTicket.finalizarCompra);

export default router;
