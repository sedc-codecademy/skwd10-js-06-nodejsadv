const AuthModel = require("../models/auth.model");
const am = new AuthModel();

class AuthController {
  login(credentials) {
    return am.login(credentials);
  }

  logout() {
    return am.logout();
  }
}

module.exports = AuthController;
