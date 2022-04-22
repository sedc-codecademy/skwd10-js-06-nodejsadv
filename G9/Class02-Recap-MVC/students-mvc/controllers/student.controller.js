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
  //4. Update Student
  static async updateStudent(req, res) {
    try {
      const studentId = req.params.id;
      const studentUpdates = req.body;

      if (studentUpdates.id) return res.status(400).send({ msg: "Invalid Update" });

      await StudentModel.patchStudent(studentId, studentUpdates);

      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //5. Delete student
  static async deleteStudent(req, res) {
    try {
      const studentId = req.params.id;
      await StudentModel.deleteStudent(studentId);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = StudentController;
