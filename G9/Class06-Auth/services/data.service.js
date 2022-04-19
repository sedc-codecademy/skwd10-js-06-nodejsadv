const fsPromises = require("fs/promises");

class DataService {
  static async readJSONFile(path) {
    const data = await fsPromises.readFile(path, { encoding: "utf-8" });
    return JSON.parse(data);
  }
  static async saveJSONFile(path, data) {
    return fsPromises.writeFile(path, JSON.stringify(data, 0, 2));
  }
}

module.exports = DataService;
