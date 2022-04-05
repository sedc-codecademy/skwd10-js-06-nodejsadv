const generateDate = require("./utils");

const generatedDate = generateDate();
console.log(generatedDate);

// ***** EXERCISE #1 *****
/**
 * Create array of students
 * Each student should be object containing following properties: fullName, age, hasPassed = true/false
 * In a file called: passedStudents.txt write the names of the students that has passed (hasPassed === true),
 * and in file named: notPassed.txt write the names of students that has not passed
 */

const students = [
  { fullName: "Bob Boski", hasPassed: true },
  { fullName: "John Doe", hasPassed: false },
  { fullName: "Bib Bologiw", hasPassed: false },
  { fullName: "Anna", hasPassed: true },
];

// const {appendFile} = require("./index");
const path = require("path");
const fileService = require("./index");

const groupStundentsByHasPassed = (studentsArray) => {
  const passedStudentsFile = path.join(__dirname, "passedStudents.txt");
  const notPassedStudentsFile = path.join(__dirname, "notPassed.txt");

  studentsArray.forEach((student) => {
    if (student.hasPassed) {
      fileService.appendFile(passedStudentsFile, `\n${student.fullName}`);
    } else {
      fileService.appendFile(notPassedStudentsFile, `\n${student.fullName}`);
    }
  });
};
groupStundentsByHasPassed(students);
