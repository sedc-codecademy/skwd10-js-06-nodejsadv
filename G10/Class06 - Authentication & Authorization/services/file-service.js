const fs = require("fs");

const readFile = (path) => {
  return JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
};

const writeFile = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content));
};

module.exports = { readFile, writeFile };
