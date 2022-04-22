const path = require("path");
const { v4: uuid } = require("uuid");

const { readFile, writeFile } = require("../utils/file-service");

class DishesModel {
  DISHES_PATH = path.join(__dirname, "..", "db", "dishes.json");

  getDishes(id) {
    return new Promise((resolve, reject) => {
      const dishes = readFile(this.DISHES_PATH);

      if (dishes.length <= 0) {
        return reject({ message: "No dishes found" });
      }

      if (id) {
        const oneDish = dishes.filter((dish) => dish.id === id);

        if (oneDish.length === 1) {
          return resolve({ message: "Dish Found", dishes: oneDish });
        } else {
          return reject({ message: "Dish with that id is not found" });
        }
      }

      return resolve({ message: "Dishes Found", dishes: dishes });
    });
  }

  addNewDish(dish) {
    return new Promise((resolve, reject) => {
      const dishes = readFile(this.DISHES_PATH);

      if (dish.price < 1 || dish.price > 1000) {
        return reject({ message: "Dish price is not valid" });
      }

      const dishToBeAdded = {
        id: uuid(),
        ...dish,
      };
      const newDishes = [...dishes, dishToBeAdded];

      writeFile(this.DISHES_PATH, newDishes);

      resolve({ message: "Dish is added" });
    });
  }

  updateDish(dish, id) {
    return new Promise((resolve, reject) => {
      const dishes = readFile(this.DISHES_PATH);

      if (dish.price < 1 || dish.price > 1000) {
        return reject({ message: "Dish price is not valid" });
      }

      const newDishes = dishes.map((dishOfDb) => {
        if (id === dishOfDb.id) {
          return {
            id,
            ...dish,
          };
        }
        return dishOfDb;
      });

      writeFile(this.DISHES_PATH, newDishes);

      resolve({ message: "Dish is updated" });
    });
  }

  deleteDish(id) {
    return new Promise((resolve, reject) => {
      const dishes = readFile(this.DISHES_PATH);

      const newDishes = dishes.filter((dish) => dish.id !== id);

      writeFile(this.DISHES_PATH, newDishes);

      resolve({ message: "Dish is successfully deleted" });
    });
  }
}

module.exports = DishesModel;
