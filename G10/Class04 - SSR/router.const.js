const express = require("express");
const router = express.Router();
const path = require("path");

const carsRoutes = require("./routes/cars.routes");

router.use(express.static(path.join(__dirname, "public")));
// ** Cars Routes
router.use("/cars", carsRoutes);
// ** Few more below =)

/** #1
 *  Exercise: Implement /add_car get route
 *  return server side rendered html
 *  html file should be named addCar.html
 *  with a simple form that contains two inputs and a button
 *  Input One: Enter Car model;
 *  Input Two: Enter Car production date;
 *  And a button that is suppose to submit the form
 */

module.exports = router;
