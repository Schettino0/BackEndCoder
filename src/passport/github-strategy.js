import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { findByEmail, login, register } from "../services/user.service.js";

const strategyOptions = {
  clientID: "Iv1.7ed053636a63679b",
  clientSecret: "22dce82c8c5d150c6c2115e53ebfa54ab8061cb9",
  callbackURL: "http://localhost:8080/user/github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  const email = profile._json.email;
  const user = await findByEmail(email);
  if (user) return done(null, user);
  const newUser = await register({
    first_name: profile._json.name,
    email: email,
    isGitHub: true,
  });
  return done(null, newUser);
};

const loginOrRegisterStrategy = new GitHubStrategy(
  strategyOptions,
  registerOrLogin
);
passport.use("github", loginOrRegisterStrategy);
