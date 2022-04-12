const router = require("express").Router();
const studentsRouter = require("../routes/student.routes");

router.use("/students", studentsRouter);

module.exports = router;
