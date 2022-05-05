const router = require("express").Router();
const StudentController = require("../controllers/student.controller");

//1. Get all students
router.get("/", StudentController.getAllStudents);
//2. Get student by id
router.get("/:id", StudentController.getStudentById);
//3. Create a student
router.post("/", StudentController.createStudent);
//4. Update a student
router.patch("/:id", StudentController.updateStudent);
//5. Delete a student
router.delete("/:id", StudentController.deleteStudent);

module.exports = router;
