const path = require("path");

const { readFile, writeFile } = require("../utils/file-service");

const HOTELS_PATH = path.join(__dirname, "..", "db", "hotel.json");

class HotelsModel {
  getHotels() {
    console.log(
      "3. Now we are at the model, we do the heavy lifting and we will return the data back"
    );
    console.log(
      "The hotels data that we will return will be consumed by the user, and we return data INSTEAD OF VIEW"
    );
    const hotels = readFile(HOTELS_PATH);

    return hotels;
  }
}

module.exports = HotelsModel;
