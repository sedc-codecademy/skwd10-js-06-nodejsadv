//Dotenv must be used on th first line in the project
require("dotenv").config();

console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_TOKEN_SECRET);

const express = require("express");
const globalRouter = require("./const/router.const");

const app = express();
app.use(express.json());

app.use(globalRouter);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is listening at port ${PORT}`);
});
