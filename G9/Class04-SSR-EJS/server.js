const express = require("express");
const path = require("path");
const cors = require("cors");
const globalRouter = require("./const/router.const");

//Path to the public folder
const publicPath = path.join(__dirname, "public");

//Path to the 404.html file
const errorPageHtmlPath = path.join(__dirname, "views", "404.html");

const app = express();

app.use(cors());
//Setting up the static files public folder
app.use(express.static(publicPath));
//Telling express which view engine we want it to use to serve dynamic html
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(globalRouter);

app.get("/example", (req, res) => {
  const array = ["test", "rest", "best"];

  res.status(200).render("example", { array });
});

//* is a wildcard character catching all get endpoints that are not defined
app.get("*", (req, res) => {
  //Sending files to the client
  res.status(404).sendFile(errorPageHtmlPath);
});

app.listen(3000, () => {
  console.log("Server is up and running at port: 3000");
});
