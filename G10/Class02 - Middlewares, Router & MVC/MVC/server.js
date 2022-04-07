const express = require("express");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

const hotelRoutes = require("./routes/hotel-routes");
/**
 * WHAT IS MVC?
 * SEPARATION OF CONCERS
 * different parts of the code that do different stuff
 * the pattern guide/helps to organise our code BETTER
 *
 * MODELS => Represents the data in our code, as-well works with the data, litterally it is the heavy lifter of
 * our application =)
 *
 * VIEWS => What the user sees, or in our case the DATA we return to the user/s,
 * in our case we wont be returning whole view but we will return DATA in json formats =)
 *
 * CONTROLLERS => Connecting our MODELS AND VIEWS, it's our middleman (in between login)
 * ROUTER are tightly connected to our controller, because in the routes we define which route should call which controller
 */

/**
 * We are going to build booking app =)
 *
 * - create route /hotels (GET, POST)
 */

app.use(express.json());
app.use("/hotels", hotelRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
