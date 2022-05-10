const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema({
  firstName: {
    type: String,
    minlength: 2,
  },
  lastName: {
    type: String,
    minlength: 2,
  },
  products: {
    type: Array,
  },
  email: {
    type: String,
    minlength: [4, "Email must be at least 4 characters"],
    maxlength: 40,
    required: [true, "Email is required"],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: () => `The email you provided is not valid email!`,
    },
  },
});

userSchema.methods.addProduct = async function (product) {
  this.products = [...this.products, product];
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
