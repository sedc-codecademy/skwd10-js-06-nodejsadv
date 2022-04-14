const router = require("express").Router();

const studentRouter = require("../routes/student.routes");

router.use("/students", studentRouter);

module.exports = router;
