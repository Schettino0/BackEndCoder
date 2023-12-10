import * as service from "../services/user.service.js";

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
    const user = await service.register(req.body);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

export const perfil = async (req, res, next) => {
  try {
    const info = req.session.info
    console.log(info)
    res.render("perfil", {style: "perfil.css", info})
  } catch (error) {}
};
