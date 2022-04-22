const path = require("path");

const { readFile } = require("../utils/file-service");

class AuthModel {
  USERS_ROUTES = path.join(__dirname, "..", "db", "users.json");

  login(credentials) {
    return new Promise((resolve, reject) => {
      const users = readFile(this.USERS_ROUTES);

      const userFound = users.find(
        (user) =>
          user.username === credentials.username &&
          user.password === credentials.password
      );

      if (userFound) {
        resolve({ message: "User logged in", user: userFound });
      } else {
        reject({ message: "No user found" });
      }
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      resolve({ message: "User logged out successfully" });
    });
  }
}

module.exports = AuthModel;
