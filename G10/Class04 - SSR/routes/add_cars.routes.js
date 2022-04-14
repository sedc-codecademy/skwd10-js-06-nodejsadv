const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  const addCarHtml = path.join(__dirname, "..", "views", "addCar.html");
  res.sendFile(addCarHtml);
});

module.exports = router;
