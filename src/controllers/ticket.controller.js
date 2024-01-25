import e from "express";
import * as serviceCart from "../services/carts.service.js";
import * as serviceProduct from "../services/products.service.js";
import { createTicket } from "../services/ticket.service.js";
import { generateRandomCode } from "../utils.js";

export const finalizarCompra = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await serviceCart.getById(cid);
    let productos = cart.products;
    let sinStock = [];
    let amount = 0;

    for (let index = 0; index < productos.length; index++) {
      const element = productos[index];
      const product = await serviceProduct.getById(element._id);
      if (!product.stock > 0) {
        sinStock.push({ ...element });
        productos.splice(index, 1);
      } else {
        product.stock -= element.quantity;
        amount += Number(product.price);
        await serviceProduct.update(product._id, product);
      }
    }

    const ticket = {
      code: generateRandomCode(10),
      amount: amount,
      purchaser: req.user.email,
    };

    const ticketCreated = await createTicket(ticket);
    console.log(ticketCreated)
    if (ticketCreated) {
      for (let index = 0; index < productos.length; index++) {
        const element = productos[index];
        const response = await serviceCart.remove(cid, element._id.valueOf());
      }
    }

    return res.status(200).json({ ticket: ticketCreated });
  } catch (error) {
    next(error.message);
  }
};
