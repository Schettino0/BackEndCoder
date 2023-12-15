export const validateLogin = (req, res, next) => {
  const estado = req.session.passport || false;
  if (estado) {
    if (estado.role == "admin") {
      req.session.info.admin = true;
    }
    next();
  } else {
    res.redirect("/login");
  }
};
