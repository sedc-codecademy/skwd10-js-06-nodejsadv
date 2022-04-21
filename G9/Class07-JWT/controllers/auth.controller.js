const AuthModel = require("../models/auth.model");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../const/jwt.const");

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
  static async logoutUser(req, res) {
    try {
      const userId = req.params.id;

      await AuthModel.deleteRefreshToken(userId);

      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //4. Refresh token endpoint
  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.cookies["refresh-token"];
      //If cookie doesn't exist
      if (!refreshToken) return res.sendStatus(403);

      const { userId } = verifyRefreshToken(refreshToken);

      const foundUser = await AuthModel.getUserById(userId);

      if (!foundUser) return res.sendStatus(403);

      if (refreshToken !== foundUser.refreshToken) return res.sendStatus(403);

      const token = createAccessToken(foundUser.id);

      res.status(200).send({ token });
    } catch (error) {
      console.log(error);
      res.status(403).send(error);
    }
  }
}

module.exports = AuthController;
