const res = require("express/lib/response");
const Student = require("../models/student.model");

class StudentService {
  //1. Get all students
  static async getAllStudents() {
    const students = await Student.find({});

    return students;
  }
  //2. Get student by id
  static async getStudentById(studentId) {
    const student = await Student.findById(studentId);

    return student;
  }
  //3. Create a student
  static async createStudent(studentData) {
    const student = new Student(studentData);

    //Data validation is done with save method
    const response = await student.save();
    console.log(response);
    return student;
  }
  //4. Update a student
  static async updateStudent(studentId, updateData) {
    const student = await Student.findById(studentId);

    if (!student) return Promise.reject({ msg: "Student not found" });

    const updateKeys = Object.keys(updateData);

    updateKeys.forEach(key => {
      // student.firstName = updateData.firstName
      // student["firstName"] = updateData["firstName"]
      if (key !== "_id") {
        student[key] = updateData[key];
      }
    });

    const updatedStudent = await student.save();

    return updatedStudent;
  }
  //5. Delete student
  static async deleteStudent(studentId) {
    await Student.findByIdAndDelete(studentId);
  }
}

module.exports = StudentService;
