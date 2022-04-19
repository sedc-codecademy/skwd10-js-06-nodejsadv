const router = require("express").Router();
const authRouter = require("../routes/auth.routes");

router.use(authRouter);

module.exports = router;
