import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userManager from "../daos/mongodb/user.dao.js";
import { findByEmail, register } from "../services/user.service.js";


const userDao = new userManager();

const strategyOptions = {
  usernameField: "email",
  passportField: "password",
  passReqToCallback: true,
};

const signup = async (req, email, password, done) => {
  try {
    const user = await findByEmail(email);
    if (user) return done(null, false);
    const newUser = await register(req.body);
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
};

const login = async (req, email, password, done) => {
  try {
    const userLogin = await userDao.login(email, password);
    if (!userLogin) return done(null, false, { msg: "User not found" });
    return done(null, userLogin);
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
};

const signUpStrategy = new LocalStrategy(strategyOptions, signup);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("login-local", loginStrategy);
passport.use("singUp-local", signUpStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
  return done(null, user);
});
