const CourseService = require("../services/course.service");

class CourseController {
  //1. Get all courses
  static async getAllCourses(req, res) {
    try {
      const courses = await CourseService.getAllCourses();

      res.status(200).send(courses);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //2. Get course by id
  static async getCourseById(req, res) {
    try {
      const { id: courseId } = req.params;

      const course = await CourseService.getCourseById(courseId);

      res.status(200).send(course);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //3. Create course
  static async createCourse(req, res) {
    try {
      const courseData = req.body;

      const createdCourse = await CourseService.createCourse(courseData);

      res.status(201).send(createdCourse);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //4. Update course
  static async updateCourse(req, res) {
    try {
      const courseId = req.params.id;
      const updateData = req.body;

      const updatedCourse = await CourseService.updateCourse(
        courseId,
        updateData
      );

      res.status(200).send(updatedCourse);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //5. Delete course
  static async deleteCourse(req, res) {
    try {
      const courseId = req.params.id;

      const deletedCourse = await CourseService.deleteCourse(courseId);

      if (!deletedCourse) {
        return res.status(404).send({ msg: "Course not found" });
      }

      res.status(200).send(deletedCourse);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //6. Update students
  static async updateStudents(req, res) {
    try {
      const courseId = req.params.id;
      const studentIds = req.body.studentIds;

      const updatedCourse = await CourseService.updateStudents(
        courseId,
        studentIds
      );
      res.status(200).send(updatedCourse);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = CourseController;
