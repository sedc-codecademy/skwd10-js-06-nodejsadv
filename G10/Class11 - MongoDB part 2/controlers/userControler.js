const User = require("../models/user");

exports.getUsers = async (req, res) => {
  const users = await User.getAllUsers();
  console.log(users);
  return res.send(users);
};

exports.createUser = async (req, res) => {
  console.log(req.body);
  const { email, userName } = req.body;

  if (!email || !userName) {
    res.statusCode = 400;
    return res.send({ error: "Required fields are missing" });
  }
  const newUser = new User(email, userName);
  const response = await newUser.save();
  console.log(response);
  res.send({ succes: true, id: response.insertedId });
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  // const id = req.params["id"];
  if (!id) {
    res.statusCode = 400;
    res.json({ error: "No id provided" });
  }

  const user = await User.getUserById(id);
  console.log(user);
  res.json(user);
};

exports.deleteUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.statusCode = 400;
    res.json({ error: "No id provided" });
  }
  const response = await User.removeUserById(id);
  res.json(response);
};

// exports.getUserById = getUserById;
// module.exports = {
//   getUserById: getUserById
// }
