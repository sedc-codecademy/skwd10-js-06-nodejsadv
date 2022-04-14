const express = require("express");
const session = require("express-session");
const ejs = require("ejs");

const app = express();
//      setting val.    value
app.set("view engine", "ejs");
//      setting val.    value
app.set("views", "views");

app.use(express.json());

const createSession = session({
  secret: "secure_session_id",
  name: "private_session_name",
  cookie: {
    maxAge: 3 * 60 * 60 * 1000,
  },
  saveUninitialized: false,
  resave: false,
});

app.use(createSession);
/**
 * Server-side rendering (SSR) is the application/server abillity to fully process and render HTML files
 * to the client =)
 */

/**
 * To enchance our SSR implementation we will use the EJS module =)
 */

const routes = require("./router.const");

//localhost:3000/api/cars
//localhost:3000/api/auth
//localhost:3000/api/add_cars

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/playground", (req, res) => {
  ejs.renderFile(
    "index.ejs",
    { fullName: "Bob Bobski", isAdult: true },
    (err, template) => {
      if (err) {
        throw new Error(err);
      } else {
        res.end(template);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("yaay our server is up and running.. =) ");
});
