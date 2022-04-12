const router = require("express").Router();
const StudentController = require("../controllers/student.controller");

//Get all students
router.get("/all", StudentController.fetchAllStudents);
//Get students by id
router.get("/:id", StudentController.fetchStudentById);
//Create new student
router.post("/add", StudentController.createNewStudent);
//Update student
router.patch("/:id/update", StudentController.updateStudent);
//Delete student
router.delete("/:id", StudentController.deleteStudent);

module.exports = router;
