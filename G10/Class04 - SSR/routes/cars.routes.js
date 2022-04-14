const router = require("express").Router();
const path = require("path");

// /api/cars
router.get("/", (req, res) => {
  // res.send("<h1>Cars route</h1>");
  const carsHtml = path.join(__dirname, "..", "views", "cars.html");
  res.sendFile(carsHtml);
});

module.exports = router;
