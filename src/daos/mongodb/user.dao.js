import CartDaoMongoDB from "./cart.dao.js";
import { UserModel } from "./models/user.model.js";

const CartDao = new CartDaoMongoDB();
export default class userManager {
  async getByEmail(email) {
    try {
      const response = await UserModel.findOne({ email });
      if (response) return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(user) {
    try {
      const cart = await CartDao.create();
      console.log(cart._id.valueOf());
      const newUser = { ...user, cartID: cart._id.valueOf() };
      const response = await UserModel.create(newUser);
      console.log(response);
      if (response) return response;
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email, password });
      if (!userExist) return false;
      else return userExist;
    } catch (error) {
      console.log(error);
    }
  }
}
