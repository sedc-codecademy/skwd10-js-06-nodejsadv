const Course = require("../models/course.model");
const StudentService = require("../services/student.service");

class CourseService {
  //1. Get all courses
  static async getAllCourses() {
    const courses = await Course.find({});

    return courses;
  }
  //2. Get course by id
  static async getCourseById(courseId) {
    const course = await Course.findById(courseId).populate("students");

    if (!course) return Promise.reject({ msg: "Course not found" });

    return course;
  }
  //3. Create course
  static async createCourse(courseData) {
    const course = new Course(courseData);

    const newCourse = await course.save();

    return newCourse;
  }
  //4. Update course
  static async updateCourse(courseId, updateData) {
    const course = this.getCourseById(courseId);

    const courseKeys = Object.keys(course);

    console.log(courseKeys.length);

    const updateKeys = Object.keys(updateData);

    updateKeys.forEach(key => {
      course[key] = updateData[key];
    });

    await course.save();

    //Up to the design of the api to return updated resource or not
    return course;
  }
  //5. Delete course
  static async deleteCourse(courseId) {
    await Course.findByIdAndDelete(courseId);
  }
  //6. Update students
  static async updateStudents(courseId, studentIds) {
    const course = await this.getCourseById(courseId);

    course.students = studentIds;

    course.students.forEach(async studentId => {
      await StudentService.updateStudent(studentId, { course: course._id });
    });

    await course.save();
    return course;
  }
}

module.exports = CourseService;
