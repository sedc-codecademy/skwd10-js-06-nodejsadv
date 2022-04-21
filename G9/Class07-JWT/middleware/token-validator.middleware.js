const { verifyAccessToken } = require("../const/jwt.const");
const AuthModel = require("../models/auth.model");

const tokenValidator = async (req, res, next) => {
  try {
    //Checking if we recieved an authorization header
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return res.sendStatus(403);

    //Taking out the token from the string
    const token = authorizationHeader.split(" ")[1];

    //We verify the token and extract the payload
    const { userId } = verifyAccessToken(token);

    //Checking if the user exists
    const user = await AuthModel.getUserById(userId);

    if (!user) return res.sendStatus(403);

    //If nothing errors out above we give access to the resource
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }
};

module.exports = tokenValidator;
