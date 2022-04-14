const router = require("express").Router();
const path = require("path");

const fileService = require("../services/file-service");
const carsDbPath = path.join(__dirname, "..", "db", "db.json");
// /api/cars
router.get("/", (req, res) => {
  // res.send("<h1>Cars route</h1>");
  // ** We served HTML through the server =)
  // const carsHtml = path.join(__dirname, "..", "views", "cars.html");
  // res.sendFile(carsHtml);

  //** Serving cars.ejs file through the server */

  const cars = fileService.readFile(carsDbPath);
  console.log(cars);
  res.render("cars", {
    pageTitle: "Cars-Page",
    pageWelcomeMsg: "Welcome to our cars page",
    welcomeDescription:
      "Description for our cars page that is server side rendered with EJS module",
    carsData: cars,
    authenticated: req.session.authenticated,
  });
});

module.exports = router;
