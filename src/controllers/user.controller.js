import userManager from "../daos/mongodb/user.dao.js";
import * as service from "../services/user.service.js";
const userDao = new userManager();
// const userService = new UserServices();

export const loginView = async (req, res, next) => {
  try {
    res.render("login", { style: "login.css" });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    // req.body.password = createHash(req.body.password);
    // const user = await service.register(req.body);
    res.status(200).json({ mgs: "Creado con exito" });
  } catch (error) {
    next(error.message);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.login(email, password);
    if (user) {
      req.session.info = {
        email: email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        cartID: user.cartID,
        loggedIn: true,
      };
      res.status(200).json({ msg: user });
    } else res.status(404).json({ msg: "Usuario o contraseña incorrecto" });
  } catch (error) {}
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    next(error.message);
  }
};

export const perfil = async (req, res, next) => {
  try {
    let info = req.user.toObject();
    res.render("perfil", { style: "perfil.css", info });
  } catch (error) {
    next(error.message);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    const { first_name, email, isGitHub, role } = req.user;
    req.session.passport.role = role;
    res.redirect("/products");
    // res.json({
    //   msg: "register ok",
    //   session: req.session,
    //   user: {
    //     first_name,
    //     email,
    //     isGitHub,
    //   },
    // });
  } catch (error) {
    next(error.message);
  }
};
