const router = require("express").Router();

const studentRouter = require("../routes/student.routes");
const courseRouter = require("../routes/course.routes");

router.use("/courses", courseRouter);
router.use("/students", studentRouter);

module.exports = router;
