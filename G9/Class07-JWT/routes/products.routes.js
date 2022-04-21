const router = require("express").Router();
const ProductController = require("../controllers/products.controller");
const tokenValidator = require("../middleware/token-validator.middleware");

router.use(tokenValidator);

router.get("/", ProductController.fetchProducts);

module.exports = router;
