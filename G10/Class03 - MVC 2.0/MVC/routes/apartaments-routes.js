const ApartamentsController = require("../controller/apartaments-controller");
const apartamentsController = new ApartamentsController();

const router = require("express").Router();

router.get("/", async (req, res) => {
  const apartaments = await apartamentsController.getApartaments();
  console.log(apartaments);
  res.send(apartaments);
});

router.post("/add_apartament", async (req, res) => {
  const apartamentObject = req.body;

  const apartamentCreated = await apartamentsController.addApartament(
    apartamentObject
  );

  res.send(apartamentCreated);
});

module.exports = router;
