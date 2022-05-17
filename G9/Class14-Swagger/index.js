require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const globalRouter = require("./const/router.const");
//Swagger specific imports
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.zzhet.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

//JsDoc Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Students Api",
      version: "1.0.0",
      description: "A simple mongoose student api",
    },
    servers: [
      { url: "http://localhost:3000/api" },
      { url: "https://production.com/api" },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(express.json());
app.use("/api", globalRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

mongoose.connect(MONGO_URI, err => {
  if (err) return console.log(err);

  console.log("Connected to MongoDB");

  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server is up at port: ${process.env.PORT}`);
  });
});
