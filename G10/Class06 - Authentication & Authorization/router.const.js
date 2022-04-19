const router = require("express").Router();

const authRoutes = require("./router/auth.routes");
const productsRoutes = require("./router/products.routes");

//localhost:3000/api/auth
router.use("/auth", authRoutes);

//localhost:3000/api/products
router.use("/products", productsRoutes);

module.exports = router;
