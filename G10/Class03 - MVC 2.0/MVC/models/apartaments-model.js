const path = require("path");
const { v4: uuid } = require("uuid");
const { readFile, writeFile } = require("../utils/file-service");

const APARTAMENTS_PATH = path.join(__dirname, "..", "db", "apartements.json");

class ApartamentsModel {
  getApartaments() {
    //return all the aprataments
    //here we will simulate that we are calling a real DB
    //and the reading takes time to finish =)

    return new Promise((resolve, reject) => {
      const apartaments = readFile(APARTAMENTS_PATH);

      //   resolve({message: "Aparements fetched", value: apartaments})
      resolve(apartaments);

      if (apartaments.length === 0) {
        reject({ message: "No aparatents currently." });
      }
    });
  }

  addApartament(apartamentObject) {
    return new Promise((resolve, reject) => {
      const apartaments = readFile(APARTAMENTS_PATH);

      const apartamentToBeAdded = {
        id: uuid(),
        ...apartamentObject,

        //   hotelName: apartamentObject.hotelName
      };

      // apartaments.push(apartamentToBeAdded)
      const apartamentsToBeSaved = [...apartaments, apartamentToBeAdded];

      writeFile(APARTAMENTS_PATH, apartamentsToBeSaved);

      resolve({ message: "New apartament is added" });
    });
  }
}

module.exports = ApartamentsModel;
