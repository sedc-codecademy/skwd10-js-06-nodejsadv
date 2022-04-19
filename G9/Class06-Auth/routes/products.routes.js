const router = require("express").Router();
const sessionValidator = require("../middleware/session-validator.middleware");
const ProductController = require("../controllers/products.controller");

router.use(sessionValidator);

router.get("/", ProductController.fetchProducts);

module.exports = router;
