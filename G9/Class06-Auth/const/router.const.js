const router = require("express").Router();
const authRouter = require("../routes/auth.routes");
const productsRouter = require("../routes/products.routes");

//Without url fragment
router.use(authRouter);
//With url fragment
router.use("/products", productsRouter);

module.exports = router;
