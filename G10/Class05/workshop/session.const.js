const session = require("express-session");

module.exports = session({
  secret: "secure_session_id",
  name: "private_session_name",

  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
  },
  saveUninitialized: false,
  resave: false,
});
