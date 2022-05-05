const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  const users = await User.getAllUsers();
  console.log(users);
  return res.send(users);
};

exports.createUser = async (req, res, next) => {
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
