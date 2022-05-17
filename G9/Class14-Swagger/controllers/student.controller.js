const Student = require("../models/student.model");
const StudentService = require("../services/student.service");

class StudentController {
  //1. Get all students
  static async getAllStudents(req, res) {
    try {
      const queryData = req.query;
      const students = await StudentService.getAllStudents(queryData);

      res.status(200).send(students);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //2. Get student by id
  static async getStudentById(req, res) {
    try {
      const studentId = req.params.id;
      const student = await StudentService.getStudentById(studentId);

      if (!student)
        return res
          .status(404)
          .send({ message: `Student with id: ${studentId} not found!` });

      res.status(200).send(student);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //3. Create student
  static async createStudent(req, res) {
    try {
      const studentData = req.body;

      const student = await StudentService.createStudent(studentData);
      console.log(student);

      res.status(201).send(student);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //4. Update student
  static async updateStudent(req, res) {
    try {
      const updates = req.body;
      const studentId = req.params.id;

      const updatedStudent = await StudentService.updateStudent(
        studentId,
        updates
      );
      res.status(200).send(updatedStudent);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //5. Delete student
  static async deleteStudent(req, res) {
    try {
      const studentId = req.params.id;

      const response = await StudentService.deleteStudent(studentId);

      if (!response)
        return res
          .status(404)
          .send({ message: `Student with id: ${studentId} not found!` });

      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = StudentController;
