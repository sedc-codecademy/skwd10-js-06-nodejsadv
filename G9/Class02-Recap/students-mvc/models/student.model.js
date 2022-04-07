const path = require("path");
const DataService = require("../services/data.service");

const studentsPath = path.join(__dirname, "..", "data", "students.json");

class StudentModel {
  //1. Get all students
  static async getAllStudents() {
    return DataService.readJSONFile(studentsPath);
  }
  //2. Get student by id
  static async getStudentById(studentId) {
    const students = await this.getAllStudents();

    const foundStudent = students.find(student => student.id === studentId);

    if (foundStudent) {
      return foundStudent;
    } else {
      return Promise.reject({ msg: "No student found" });
    }
  }
  //3. Add new student
  //4. Update student PATCH or PUT
  //5. Delete student
}

module.exports = StudentModel;
