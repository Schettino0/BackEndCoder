import express from "express";
import { ProductManager } from "./ProductManager.js";
const app = express();
app.use(express.json());
const store = new ProductManager();

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server corriendo en puerto ", PORT);
});

app.get("/products", async (req, res) => {
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

app.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    res.status(200).send(await store.getProductByID(id));
  } catch (error) {
    res.status(404).send({ error: "ID no encontrado", message: error.message });
  }
});
