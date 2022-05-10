require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
app.use("/v1", userRouter);

const MONGO_URI = `mongodb+srv://gocekabov:${process.env.USER_MONGO_PASSWORD}@first-app.tssnd.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("CONNECTED TO DATABASE SUCCESS!");
  app.listen(3000);
});
