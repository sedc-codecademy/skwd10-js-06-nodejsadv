const router = require("express").Router();
const StudentController = require("../controllers/student.controller");

//Get all students
router.get("/all", StudentController.fetchAllStudents);
//Get students by id
router.get("/:id", StudentController.fetchStudentById);
//Create new student
router.post("/add", StudentController.createNewStudent);

module.exports = router;
