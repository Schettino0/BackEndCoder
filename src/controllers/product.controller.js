import * as service from "../services/products.service.js";

export const getAll = async (req, res, next) => {
  try {
    const limit = req.query.limit;
    if (limit) {
      const products = await service.getAll();
      const limitProducts = products.slice(0, parseInt(limit));
      res.render("home", {
        style: "products.css",
        products: limitProducts,
      });
    } else {
      const products = await service.getAll();
      res.render("home", { style: "products.css", products });
    }
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) {
      res.status(404).json({ msg: "Product Not found!" });
    } else {
      res.render("home", { style: "products.css", products: { response } });
    }
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const { title, description, code, price, stock, thumbnails } = req.body;
    const newProd = {title,description,code,price,stock,thumbnails}
    const response = await service.create(newProd);
      if (!response) res.status(404).json({ msg: "Error create product!" });
    res.status(200).json(newProd);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.update(id, req.body);
    if (!prodUpd) res.status(404).json({ msg: "Error update product!" });
    else res.status(200).json(prodUpd);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await service.remove(id);
    if (!prodDel) res.status(404).json({ msg: "Error delete product!" });
    else res.status(200).json({ msg: `Product id: ${id} deleted` });
  } catch (error) {
    next(error.message);
  }
};
