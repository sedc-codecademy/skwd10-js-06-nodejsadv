const router = require("express").Router();
const CourseController = require("../controllers/course.controller");

//1 Get all courses
router.get("/", CourseController.getAllCourses);
//2 Get course by id
router.get("/:id", CourseController.getCourseById);
//3 Create course
router.post("/", CourseController.createCourse);
//4 Update course
router.patch("/:id", CourseController.updateCourse);
//5 Delete course
router.delete("/:id", CourseController.deleteCourse);
//6 Update students
router.patch("/:id/students", CourseController.updateStudents);

module.exports = router;
