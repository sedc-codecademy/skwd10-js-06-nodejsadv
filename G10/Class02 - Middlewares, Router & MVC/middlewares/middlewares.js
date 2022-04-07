const logPizzaMenuMiddleware = (req, res, next) => {
  console.log("Requested URL is: ", req.originalUrl);
  console.log("I WILL ONLY EXECUTE/INTERCEPT REQUESTS TO PIZZA MENU ROUTE =)");

  next();
};

const validateCredentials = (req, res, next) => {
  const credentials = req.body;

  if (!credentials.username || !credentials.password) {
    res.status(400).send({ message: "Missing credentials" });
  } else {
    next();
  }
};

module.exports = { logPizzaMenuMiddleware, validateCredentials };
