const { getDb } = require("../database");

class User {
  constructor(email, username, id) {
    this.email = email;
    this.userName = username;
    this._id = id;
  }

  save() {
    const db = getDb();
    console.log(db);
    return db.collection("users").insertOne(this);
  }

  static getAllUsers() {
    const db = getDb();
    return db.collection("users").find().toArray();
  }
}

module.exports = User;
