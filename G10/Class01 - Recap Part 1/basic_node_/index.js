// MODULES
// What are modules in Node js?
// Consider them as JS libraries =)

// Path, http, fs module

// **** FILE SYSTEM MODULE ****

const fs = require("fs");
const path = require("path");

const ourFilePath = path.join(__dirname, "greetings.txt");

//WRITE FILE
const writeFile = (pathToFile, content) => {
  // ALERT!! OVERWRITE EVERTHING INSIDE THAT FILE!!!
  fs.writeFileSync(pathToFile, content);
};
writeFile(ourFilePath, "Bonjour!");

//READ FILE
const readFile = (pathToFile) => {
  return fs.readFileSync(pathToFile, { encoding: "utf-8" });
};
const weReadFromFile = readFile(ourFilePath);
console.log(weReadFromFile);

//APPEND FILE
const appendFile = (pathToFile, content) => {
  fs.appendFileSync(pathToFile, content);
};
appendFile(ourFilePath, "\nGood day!");

// This call, this content will overwrite everything in the path given =)
// writeFile(ourFilePath, "I overwrote everything!");

//DELETE FILE
const deleteFile = (pathToFile) => {
  fs.unlinkSync(pathToFile);
};

// deleteFile(ourFilePath);

// module.exports = {
//   writeFile: writeFile,
//   appendFile: appendFile,
//   deleteFile: deleteFile,
//   readFile: readFile,
// };

// It is same as above =) but better =)

module.exports = {
  writeFile,
  appendFile,
  deleteFile,
  readFile,
};
