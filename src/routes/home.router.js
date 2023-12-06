import { Router } from "express";

import * as controller from "../controllers/product.controller.js";


const router = Router();

router.get("/", controller.getAllView)


export default router;
