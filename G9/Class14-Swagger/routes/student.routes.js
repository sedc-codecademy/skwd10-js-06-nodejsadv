const router = require("express").Router();
const StudentController = require("../controllers/student.controller");

/**
 * @swagger
 * components:
 *      schemas:
 *          Student:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName
 *                  - age
 *                  - email
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The mongo _id of the student
 *                  firstName:
 *                      type: string
 *                      description: Studernt's first name
 *                  lastName:
 *                      type: string
 *                      description: Studernt's first name
 *                  age:
 *                      type: string
 *                      description: Studernt's first name
 *                  email:
 *                      type: string
 *                      description: Studernt's first name
 *              example:
 *                  _id: 213h1j2j3hj123jhjhj12h
 *                  firstName: Test
 *                  lastName: Testerson
 *                  age: 30
 *                  email: test@gmail.com
 */

/**
 * @swagger
 * components:
 *      requestBodies:
 *          StudentRequestBody:
 *              description: A JSON object containing student information
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              age:
 *                                  type: number
 *                              email:
 *                                  type: string
 *                      example:
 *                          firstName: Best
 *                          lastName: Besterson
 *                          age: 30
 *                          email: best@gmail.com
 */

/**
 * @description Defining tag for students
 * @swagger
 * tags:
 *      name: Students
 *      description: All student endpoints
 */

/**
 * @description Endpoint for fetching all students
 * @swagger
 * /students:
 *      get:
 *          summary: Returns all the students
 *          tags: [Students]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                  type: string
 *                  required: true
 *
 *          responses:
 *              200:
 *                  description: The array of student documents
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Student"
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Server Error
 */
router.get("/", StudentController.getAllStudents);

/**
 * @description Endpoint for getting a student by id
 * @swagger
 * /students/{id}:
 *      get:
 *          summary: Get a student by id
 *          tags: [Students]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The student id
 *          responses:
 *              200:
 *                  description: The student document
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Student"
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: Student not found
 *              500:
 *                  description: Server Error
 */
router.get("/:id", StudentController.getStudentById);

/**
 * @description Endpoint for creating a student
 * @swagger
 * /students:
 *      post:
 *          summary: Create a new student
 *          tags: [Students]
 *          requestBody:
 *              $ref: "#/components/requestBodies/StudentRequestBody"
 *          responses:
 *              201:
 *                  description: Student was created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Student"
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Server Error
 *
 */
router.post("/", StudentController.createStudent);

/**
 * @description Endpoint for updating a student
 * @swagger
 * /students/{id}:
 *      patch:
 *          summary: Update an existing student
 *          tags: [Students]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The student id
 *          requestBody:
 *              $ref: "#/components/requestBodies/StudentRequestBody"
 *          responses:
 *              200:
 *                  description: Student updated successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Student"
 *              400:
 *                  description: Bad Request
 *              404:
 *                  description: Student Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  msg:
 *                                      type: string
 *                              example:
 *                                  msg: Student Not Found
 *              500:
 *                  description: Server Error
 */
router.patch("/:id", StudentController.updateStudent);

/**
 * @description Endpoint for deleting a student
 * @swagger
 * /students/{id}:
 *      delete:
 *          summary: Delete a student by id
 *          tags: [Students]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The student id
 *          responses:
 *              200:
 *                 description: Student was deleted successfully
 *                 content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Student"
 *              400:
 *                 description: Bad Request
 *              404:
 *                 description: Student Not Found
 *              500:
 *                 description: Server Error
 */
router.delete("/:id", StudentController.deleteStudent);

module.exports = router;
