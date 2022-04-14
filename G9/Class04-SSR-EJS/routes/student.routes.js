const router = require("express").Router();
const path = require("path");
const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");

const studentsPath = path.join(__dirname, "..", "data", "students.json");

// 1. Render student list
router.get("/", async (req, res) => {
  try {
    const students = await DataService.readJSONFile(studentsPath);

    res.status(200).render("student-list", { students });
  } catch (error) {
    res.status(400).send(error);
  }
});

// 2. Render add student form
router.get("/add-student", (req, res) => {
  res.status(200).render("add-student-form");
});

// 3. Render student details
router.get("/:id", async (req, res) => {
  try {
    const students = await DataService.readJSONFile(studentsPath);
    const foundStudent = students.find(student => student.id === req.params.id);

    if (foundStudent) {
      res.status(200).render("student-details", { foundStudent });
    } else {
      res.status(404).render("not-found-student", {
        customTitle: "Student Not Found",
        msg: "We are sorry but the student with specified Id doesn't exist",
        imgPath: "/not-found.png",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// 4. Post add student form
router.post("/add-student", async (req, res) => {
  try {
    const studentData = req.body;
    const students = await DataService.readJSONFile(studentsPath);

    const newStudent = {
      id: uuid(),
      ...studentData,
    };

    const updatedStudents = [...students, newStudent];

    await DataService.saveJSONFile(studentsPath, updatedStudents);

    res.redirect(`/students/${newStudent.id}`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
