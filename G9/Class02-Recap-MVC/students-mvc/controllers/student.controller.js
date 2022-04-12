const StudentModel = require("../models/student.model");

class StudentController {
  //1. Fetch all students
  static async fetchAllStudents(req, res) {
    try {
      const students = await StudentModel.getAllStudents();
      res.status(200).send(students);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //2. Fetch student by id
  static async fetchStudentById(req, res) {
    try {
      const { id: studentId } = req.params;

      const student = await StudentModel.getStudentById(studentId);
      res.status(200).send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //3. Add new student
  static async createNewStudent(req, res) {
    try {
      const newStudentData = req.body;

      const createdStudent = await StudentModel.addNewStudent(newStudentData);

      res.status(201).send(createdStudent);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = StudentController;
