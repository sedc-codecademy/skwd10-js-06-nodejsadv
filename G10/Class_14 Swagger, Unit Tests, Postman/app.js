const express = require("express");
const booksRoutes = require("./routes/books");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books Api",
      version: "1.0.0",
      description: "Documentation for books api",
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use("/books", booksRoutes);

module.exports = app;
