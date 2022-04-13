const router = require("express").Router();

// *** IMPLEMENTING MVC ****

const HotelsController = require("../controller/hotels-controller");
const hotelsController = new HotelsController();

// localhost:3000/hotels
router.get("/", (req, res) => {
  // We will call just the coresponding controller
  // Lets create the first controller

  console.log(
    "1. We are at HOTELS route and we are about to call the controller =)"
  );

  // call of controller
  const hotels = hotelsController.getHotels();

  res.send(hotels);
});

// localhost:3000/hotels/add_hotel
//route.get('/add_hotel')

module.exports = router;
