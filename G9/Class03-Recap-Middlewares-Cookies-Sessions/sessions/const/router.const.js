const router = require("express").Router();
const studentsRouter = require("../routes/student.routes");
const authRouter = require("../routes/auth.routes");

router.use("/students", studentsRouter);
router.use("/auth", authRouter);

module.exports = router;
