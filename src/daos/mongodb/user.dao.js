import { createHash, isValidPass } from "../../utils.js";
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
      const newUser = { ...user, cartID: cart._id.valueOf() };
      if (user.password) newUser.password = createHash(user.password);
      const response = await UserModel.create(newUser);
      console.log(response);
      if (response) return response;
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email });
      console.log(userExist);
      if (userExist) {
        const isValid = isValidPass(password, userExist);
        delete userExist.password;
        if (!isValid) return false;
        else return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const userExist = await UserModel.findById(id);
      // console.log(userExist);
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
      // throw new Error(error)
    }
  }
}
