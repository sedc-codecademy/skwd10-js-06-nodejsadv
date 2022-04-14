const express = require("express");
const router = require("./router.const");

const app = express();

app.use(express.json());

/**
 * Server-side rendering (SSR) is the application/server abillity to fully process and render HTML files
 * to the client =)
 */

const routes = require("./router.const");

//localhost:3000/api/cars
//localhost:3000/api/auth
//localhost:3000/api/add_cars

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.listen(3000, () => {
  console.log("yaay our server is up and running.. =) ");
});
