import { Router } from "express";
import { ProductManager } from "../manager/ProductManager.js";
const store = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    if (limit) {
      const products = await store.getProducts();
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.status(200).send(await store.getProducts());
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    res.status(200).send(await store.getProductByID(id));
  } catch (error) {
    res.status(404).send({ error: "ID no encontrado", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, thumbnails } = req.body;
    await store.addProduct(title, description, price, thumbnails, code, stock);
    res.status(200).send("Producto agregado con exito.");
  } catch (error) {
    res.status(404).send({
      error: "No se pudo agregar el producto.",
      message: error.message,
    });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const { title, description, code, price, stock, thumbnails } = req.body;
    const newInfo = { title, description, price, code, stock, thumbnails };
    await store.updateProduct(id, newInfo);
    res.status(200).send("Producto actualizado con exito.");
  } catch (error) {
    res.status(404).send({
      error: "No se pudo actualizar el producto.",
      message: error.message,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    await store.deleteProduct(id);
    res.status(200).send(`Producto eliminado exitosamente.`);
  } catch (error) {
    res.status(404).send({
      error: "No se pudo eliminar el producto.",
      message: error.message,
    });
  }
});

export default router;
