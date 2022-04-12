//File system module
const fs = require("fs");
//File system promises module
const fsPromises = require("fs/promises");
//Path module
const path = require("path");

const notesPath = path.join(__dirname, "notes.txt");
const dataPath = path.join(__dirname, "data.json");

// fs.writeFileSync(notesPath, "First entry by trainer\n");
//TODO Append to the file the following "Second entry by SEDC Student\n"
// fs.appendFileSync(notesPath, "Second entry by SEDC Student\n");

const notesData = fs.readFileSync(notesPath, { encoding: "utf-8" });
// console.log(notesData);

//Async Operations
// fs.readFile(dataPath, { encoding: "utf-8" }, (err, data) => {
//   if (err) throw new Error(err);

//   const parsedData = JSON.parse(data);

//   const newItem = {
//     name: "dishwasher",
//     price: 420.33,
//   };

//   const updatedData = [...parsedData, newItem];

//   fs.writeFile(dataPath, JSON.stringify(updatedData, 0, 2), () => {
//     ///TODO Read and console.log the data.json file inside this callback
//     fs.readFile(dataPath, { encoding: "utf-8" }, function (err, data) {
//       console.log(JSON.parse(data));
//     });
//   });
// });

//Async version
// fs.appendFile(notesPath, "Forth entry by SEDC Student\n", function (err) {
//   if (err) throw new Error(err);
//   console.log("Data is added successfully");
// });

const init = async () => {
  try {
    const data = await fsPromises.readFile(dataPath, { encoding: "utf-8" });
    const parsedData = JSON.parse(data);
    const newItem = {
      name: "dishwasher",
      price: 420.33,
    };
    console.log(parsedData);
    const updatedData = [...parsedData, newItem];
    fsPromises.writeFile(dataPath, JSON.stringify(updatedData, 0, 2));
    const newData = await fsPromises.readFile(dataPath, { encoding: "utf-8" });
    console.log(JSON.parse(newData));
  } catch (error) {
    console.log(error);
  }
};

init();
