const sessionValidator = (req, res, next) => {
  const loggedIn = req.session.loggedIn;

  if (loggedIn) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = sessionValidator;
