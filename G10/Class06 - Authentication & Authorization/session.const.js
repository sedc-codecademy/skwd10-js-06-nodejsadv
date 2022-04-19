const session = require("express-session");

module.exports = session({
  secret: "my_wicked_secret",
  name: "vlatko_stefanovski",
  cookie: {
    maxAge: 1 * 60 * 60 * 1000,
  },
  saveUninitialized: false, //during the lifetime of the req, the req.session object is not modified it will not be saved
  /**
   * req.session
   *
   * we make request to a route
   *
   */
  //saveUninitialized: true, //during the lifetime of the req, if the session is not modified it will be still saved

  resave: false,
});

/**
 * ourDB = [
 *  {empty object}
 *  {empty object}
 *  {empty object}
 *  {empty object}
 *  {empty object}
 *  {empty object}
 * ]
 */
