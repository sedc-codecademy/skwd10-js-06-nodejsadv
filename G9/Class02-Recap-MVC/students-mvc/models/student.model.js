const path = require("path");
const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");

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
  static async addNewStudent(newStudentData) {
    const students = await this.getAllStudents();

    const emailExists = students.some(
      student => student.email === newStudentData.email
    );

    if (emailExists) return Promise.reject({ msg: "Email already registered" });

    const newStudent = {
      id: uuid(),
      ...newStudentData,
    };

    const updatedStudents = [...students, newStudent];

    await DataService.saveJSONFile(studentsPath, updatedStudents);

    return newStudent;
  }
  //4. Update student PATCH or PUT
  //TODO Update student using PATCH or PUT and also check if the req.body has an id property and return a 400 status if it does.
  //5. Delete student
}

module.exports = StudentModel;
