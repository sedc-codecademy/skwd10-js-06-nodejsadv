const fs = require("fs");

const readFile = (path) => {
  return JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
};

module.exports = { readFile };
