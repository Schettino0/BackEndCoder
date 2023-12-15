export const alreadyLogged = (req, res, next) => {
  const usuario = req.user || false;
  if (usuario) {
    res.redirect("/products");
  } else {
    next();
  }
};
