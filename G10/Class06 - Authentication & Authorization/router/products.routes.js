const router = require("express").Router();
const path = require("path");

const fileService = require("../services/file-service");
const productsDB = path.join(__dirname, "..", "db", "db.json");

const isAuth = require("../middlewares/auth");

//localhost:3000/api/products
router.get("/", isAuth, (req, res) => {
  const products = fileService.readFile(productsDB);

  res.send(products);
});

module.exports = router;
