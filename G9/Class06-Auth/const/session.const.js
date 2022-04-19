const session = require("express-session");

const createSession = session({
  secret: "verysecretsecret",
  name: "session_id",
  cookie: {
    httpOnly: true,
    maxAge: 5 * 60 * 60 * 1000,
    secure: false,
  },
  saveUninitialized: true,
  resave: false,
});

module.exports = createSession;
