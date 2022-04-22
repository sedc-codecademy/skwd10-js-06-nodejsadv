const router = require("express").Router();

const dishesRoutes = require("./routes/dishes.route");
const ordersRoutes = require("./routes/orders.route");
const authRoutes = require("./routes/auth.route");

router.use("/dishes", dishesRoutes);
router.use("/orders", ordersRoutes);
router.use("/auth", authRoutes);

module.exports = router;
