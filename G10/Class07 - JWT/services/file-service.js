const fs = require("fs");
const path = require("path");

const readFile = (path) => {
  return JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
};

const writeFile = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content));
};

// TOKEN SPECIFIC:
const tokenPath = path.join(__dirname, "..", "db", "tokens.json");

const getTokens = () => {
  return JSON.parse(fs.readFileSync(tokenPath, { encoding: "utf-8" }));
};

const addToken = (token) => {
  const tokens = getTokens();
  // Store refresh token =)
  tokens.push(token);
  fs.writeFileSync(tokenPath, JSON.stringify(tokens));
};

module.exports = { readFile, writeFile, addToken, getTokens };
