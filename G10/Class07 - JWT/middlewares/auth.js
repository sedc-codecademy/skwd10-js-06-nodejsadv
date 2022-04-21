const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  // WE ASK FOR THE TOKEN
  const token = req.header("Authorization");

  // WE CHECK IF THERE IS A TOKEN
  if (!token) {
    return res.status(401).send({ message: "Access denied!" });
  }

  // console.log("TOKEN", token);
  /**
   * If we want to validate tokenWithoutBearer, in the Authorization field on talend api
   * provide Berier accessTokenValue
   */
  // const tokenWithoutBearer = token.split(" ")[1];
  // console.log("TOKEN WITHOUT BEARED", tokenWithoutBearer);

  // WE VERIFY THE TOKEN/WE CHECK IF IT IS A VALID TOKEN
  jwt.verify(token, "important_jwt_secret", (err, user) => {
    if (err) {
      // the token is INVALID
      return res
        .status(403)
        .send({ message: "You are not allowed to get this data." });
    }
    // TOKEN IS VALID WE MAY PROCEED
    console.log("USER:", user);
    req.user = user;
    next();
  });
};

module.exports = isAuth;
