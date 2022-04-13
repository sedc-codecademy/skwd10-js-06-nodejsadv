const ApartamentsModel = require("../models/apartaments-model");
const apartamentsModel = new ApartamentsModel();

class ApartamentsController {
  getApartaments() {
    // const apartaments = await apartamentsModel.getApartaments();
    // return apartaments;

    return apartamentsModel.getApartaments();
  }

  addApartament(apartamentObject) {
    const apartamentCreated = apartamentsModel.addApartament(apartamentObject);

    // return await apartamentsModel.addApartament(apartamentObject);

    return apartamentCreated;
  }
}

module.exports = ApartamentsController;
