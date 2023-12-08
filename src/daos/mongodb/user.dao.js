import { UserModel } from "./models/user.model.js";

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
      const response = await UserModel.create(user);
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

