//File system module
const fs = require("fs");
//File system promises module
const fsPromises = require("fs/promises");
//Path module
const path = require("path");

const notesPath = path.join(__dirname, "notes.txt");
const dataPath = path.join(__dirname, "data.json");

fs.writeFileSync(notesPath, "First entry by trainer\n");
//TODO Append to the file the following "Second entry by SEDC Student\n"
