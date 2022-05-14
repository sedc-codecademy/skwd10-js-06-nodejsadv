const { getDb } = require("../database");
const { ObjectId } = require("mongodb");

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

  static getUserById(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: ObjectId(id) });
  }

  static removeUserById(id) {
    const db = getDb();
    return db.collection("users").deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = User;
