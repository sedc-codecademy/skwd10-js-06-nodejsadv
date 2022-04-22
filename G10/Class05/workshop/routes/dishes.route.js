const router = require("express").Router();
const DishesController = require("../controllers/dishes.controller");
const dc = new DishesController();

const {
  validateAuthenticatedSession,
  validateIsAdminSession,
} = require("../utils/session-validator");
//Get All

router.get("/:id?", validateAuthenticatedSession, async (req, res) => {
  const id = req.params.id;

  try {
    const dishes = await dc.getDishes(id);

    res.send(dishes);
  } catch (error) {
    res.send(error);
  }
});

//Create dish
router.post("/", validateIsAdminSession, async (req, res) => {
  const dishToAdd = req.body;

  try {
    const dishes = await dc.addNewDish(dishToAdd);

    res.send(dishes);
  } catch (error) {
    res.send(error);
  }
});

// Update dish
router.patch("/:id", validateIsAdminSession, async (req, res) => {
  const dish = req.body;
  const id = req.params.id;

  try {
    const dishes = await dc.updateDish(dish, id);

    res.send(dishes);
  } catch (error) {
    console.log("here");
    res.send(error);
  }
});

//Delete dish
router.delete("/:id", validateIsAdminSession, async (req, res) => {
  const id = req.params.id;

  try {
    const dishes = await dc.deleteDish(id);

    res.send(dishes);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
