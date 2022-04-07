const fs = require("fs");

const readFile = (path) => {
  const results = fs.readFileSync(path, { encoding: "utf-8" });

  return JSON.parse(results);
};

const writeFile = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content));
};

module.exports = { readFile, writeFile };
