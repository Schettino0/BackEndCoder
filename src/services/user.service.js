import userManager from "../daos/mongodb/user.dao.js";

const userDao = new userManager();

export const findByEmail = async (email) => {
  return userDao.getByEmail(email);
};

export const register = async (user) => {
  try {
    if (user.isGitHub == true) {
      const exists = await userDao.getByEmail(user.email);
      if (!exists) return await userDao.createUser(user);
      else return false;
    } else {
      const { email, password } = user;
      if (email === "adminCoder@coder.com") {
        return await userDao.createUser({ ...user, role: "admin" });
      }
      return await userDao.createUser(user);
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email, password) => {
  try {
    const userExist = await userDao.login(email, password);
    if (!userExist) return false;
    else return userExist;
  } catch (error) {
    console.log(error);
  }
};
