const isAuth = (req, res, next) => {
  // req.session.authenticated === true
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).send({ message: "Not authenticated" });
  }
};

module.exports = isAuth;
