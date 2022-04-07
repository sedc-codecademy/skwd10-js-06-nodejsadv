const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// we need this middleware
// so our server can recieve json in the body that was sent within the request =)
app.use(express.json());

const errorPage = path.join(__dirname, "error-page", "index.html");
const jokesPath = path.join(__dirname, "jokes.json");

//localhost:3000
//this is the default route
app.get("/", (req, res) => {
  res.send(`
        <h1>Our very main page</h1>
        <p>This is our default page</p>
    `);
});
/**
 * if we do not have / infront of the url
 * the route will not be found, we will receive 404
 */
app.get("/jokes", (req, res) => {
  // res.send("What is Bruce Lee's favorite drink? Wataaaaah!");

  const jokes = JSON.parse(fs.readFileSync(jokesPath, { encoding: "utf-8" }));

  // res.send()
  // res.json()
  res.send(jokes);
});

// PATH PARAM
app.get("/jokes/:name", (req, res) => {
  console.log(req.params);
  const jokeValueOfPathParam = req.params;

  const jokes = JSON.parse(fs.readFileSync(jokesPath, { encoding: "utf-8" }));

  const jokeFound = jokes.find(
    (joke) => joke.jokeTitle === jokeValueOfPathParam.name
  );

  if (jokeFound) {
    res.send(jokeFound);
  } else {
    res.send({ message: "Joke with that name was not found" });
  }
});

// Query params
app.get("/all_products", (req, res) => {
  console.log("We are at all_products route =)");
  console.log(req.query);
  res.send({ message: "This is all products page" });
});

app.post("/jokes", (req, res) => {
  const jokeReceived = req.body;

  // We read everything from the JSON
  const jokesFromDB = JSON.parse(
    fs.readFileSync(jokesPath, { encoding: "utf-8" })
  );

  // We modify it
  jokesFromDB.push(jokeReceived);

  // With writefileSync we overwrite it with the modified data =)
  fs.writeFileSync(jokesPath, JSON.stringify(jokesFromDB));

  res.status(201).send({ message: "Joke is created" });
});

// WE ALWAYS PUT * AT THE END
app.get("*", (req, res) => {
  //   res.send("<h1>ROUTE  NOT FOUND</h1>");
  res.sendFile(errorPage);
});

const swapiUrl = "https://swapi.dev/api/people/1";
const axios = require("axios");

const getSwapiPeople = async () => {
  const result = await axios.get(swapiUrl);

  // console.log(result);

  const person = result.data;
  console.log(person);
};

getSwapiPeople();
app.listen(3000, () => {
  console.log("Server is up and running on port 3000.");
});
