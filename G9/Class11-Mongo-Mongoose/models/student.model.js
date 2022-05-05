const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

//Defining a student schema
const studentSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: 2,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: 2,
  },
  age: {
    type: Number,
    min: [18, "Age must be greater than 18"],
    max: 120,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    validate: {
      validator: val => validator.isEmail(val),
      message: error => `${error.value} is not a valid email`,
    },
    required: true,
    //unique creates indexes for the specified value
    unique: true,
  },
});

//Creating the student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
