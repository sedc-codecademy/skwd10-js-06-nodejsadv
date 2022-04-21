const AuthModel = require("../models/auth.model");
const { createAccessToken, createRefreshToken } = require("../const/jwt.const");

class AuthController {
  // 1. Register a user
  static async registerUser(req, res) {
    try {
      const userData = req.body;
      const registeredUser = await AuthModel.createUser(userData);
      res.status(201).send(registeredUser);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  // 2. Login user
  static async loginUser(req, res) {
    try {
      const credentials = req.body;

      const user = await AuthModel.loginUser(credentials);
      //Create and send token to client
      const token = createAccessToken(user.id);
      //Create and send refresh token cookie to the client
      const refreshToken = createRefreshToken(user.id);
      res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/refresh-token",
      });
      //Saving the refresh token in the database
      await AuthModel.saveRefreshToken(user.id, refreshToken);

      res.status(200).send({ user, token });
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  }
  // 3. Logout user
  static logoutUser(req, res) {
    try {
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = AuthController;
