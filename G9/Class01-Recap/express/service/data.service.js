const fsPromises = require("fs/promises");

class DataService {
  //1. Read file
  static readFile(path) {
    return fsPromises.readFile(path, { encoding: "utf-8" });
  }
  //2. Save file
  static saveFile(path, data) {
    return fsPromises.writeFile(path, JSON.stringify(data, 0, 2));
  }
}

module.exports = DataService;
