export const alreadyLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/products");
  } else {
    next();
  }
};
