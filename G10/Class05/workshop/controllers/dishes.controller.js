const DishesModel = require("../models/dishes.model");
const dm = new DishesModel();

class DishesController {
  getDishes(id) {
    return dm.getDishes(id);
  }

  addNewDish(dish) {
    return dm.addNewDish(dish);
  }

  updateDish(dish, id) {
    return dm.updateDish(dish, id);
  }

  deleteDish(id) {
    return dm.deleteDish(id);
  }
}

module.exports = DishesController;
