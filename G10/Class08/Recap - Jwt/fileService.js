const fs = require("fs");
const path = require("path");

const tokenPath = path.join(__dirname, "db", "refresh_token_db.json");

const getTokens = () => {
  return JSON.parse(fs.readFileSync(tokenPath, {encoding: "utf-8"}))
}

const addToken = (refreshToken) => {
  const tokens = getTokens();
  tokens.push(refreshToken)
  fs.writeFileSync(tokenPath, JSON.stringify(tokens))
}

module.exports = {getTokens, addToken}