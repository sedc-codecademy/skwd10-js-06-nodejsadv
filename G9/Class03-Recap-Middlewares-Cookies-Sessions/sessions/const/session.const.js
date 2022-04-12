const session = require("express-session");

const createSession = session({
  secret: ["2312jh3j1h23jh12jh3"],
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
