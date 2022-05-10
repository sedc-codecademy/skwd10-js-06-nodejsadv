const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const id = req.params["id"];
  const user = await User.findById(id);
  res.json(user);
};

exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = new User(userData);
    const response = await newUser.save();
    res.json(response);
  } catch (error) {
    res.statusCode = 400;
    res.json(error.message);
  }
};

exports.deleteUserById = async (req, res) => {
  const id = req.params["id"];
  const response = await User.findByIdAndRemove(id);
  res.json(response);
};

exports.addProductToUser = async (req, res) => {
  const id = req.params["id"];
  const product = req.body;
  try {
    const user = await User.findById(id);
    await user.addProduct(product);
    res.json({ message: "Product added" });
  } catch (error) {}
};
