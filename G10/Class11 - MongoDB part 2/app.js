require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { mongoConnect } = require("./database");

const app = express();

app.use(express.json());

app.use(userRoutes);

// app.use("/users", userRoutes);
mongoConnect(() => {
  app.listen(3000);
});
