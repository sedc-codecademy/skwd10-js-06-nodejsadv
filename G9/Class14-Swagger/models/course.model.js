const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  numberOfClasses: {
    type: Number,
    min: 1,
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  assistant: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
