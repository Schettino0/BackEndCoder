import * as service from "../services/carts.service.js";

export const getAll = async (req, res, next) => {
  try {
    const carros = await service.getAll();
    res.status(200).json(carros);
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const carro = await service.getById(req.params.id);
    if (!carro) {
      res.status(404).json({ msg: "Cart Not Found!" });
    } else {
      res.status(200).json(carro);
    }
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newCart = await service.create();
    if (!newCart) {
      throw Error("Error creating cart");
    } else {
      res.status(201).json({ msg: "Carro creado con exito ", newCart });
    }
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cartDel = await service.remove(id);
    if (!cartDel) res.status(404).json({ msg: "Error Delete Cart" });
    else res.status(200).json({ msg: "Carro eliminado" });
  } catch (error) {
    next(error.message);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const response = await service.addProduct(cid,pid);
    if (!response) res.status(404).json({ msg: "Error"})
    else res.status(200).json({msg: "Producto agregado"})
    
  } catch (error) {
    next(error.message)
  }
};
