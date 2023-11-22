import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  async addProductToCart(cid, pid) {
    try {

      const cart = await CartModel.findOne({ _id: cid });

      if (cart.products.some((elemento) => elemento._id == pid)) {
        const indexProducto = cart.products.findIndex(
          (elemento) => elemento._id == pid
        );
        cart.products[indexProducto].quantity += 1;
      } else {
        cart.products.push(pid);
      }
      cart.save();
      console.log(cart)
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const response = await CartModel.find({}).lean();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await CartModel.findById(id).lean();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
