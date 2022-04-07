const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

const {
  logPizzaMenuMiddleware,
  validateCredentials,
} = require("./middlewares");

// MIDDLEWARES
/**
 * Middlewares are functions that will intercept EVERY request made to our server
 * Or we can as-well configure them to INTERCEPT requests on specific ROUTE! =)
 */

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    "Yes, we are inside the middleware and I will INTERCEPT each request made to this server =), I am the boss "
  );

  const currentTime = new Date().toISOString();
  fs.appendFileSync(
    "requestToServer.txt",
    `\n${currentTime} => route: ${req.originalUrl}`
  );

  next();
});

app.get("/", (req, res) => {
  console.log("Our default route");

  res.send("<h1>Hello world</h1>");
  //   res.json({ message: "Our main page" });
});

app.get("/pizza_menu", logPizzaMenuMiddleware, (req, res) => {
  const pizzas = [
    { pizzaName: "Peperoni Pizza", price: "220MKD" },
    { pizzaName: "Margaritta Pizza", price: "180MKD" },
    { pizzaName: "Pineapple Pizza", price: "300MKD" },
  ];

  res.json(pizzas);
});

app.post("/login", validateCredentials, (req, res) => {
  const users = [{ username: "qwerty", password: "qwerty" }];

  const credentials = req.body;

  const userFound = users.find(
    (user) =>
      user.username === credentials.username &&
      user.password === credentials.password
  );

  if (userFound) {
    return res.send({ message: "User found and logged in" });
  } else {
    res.status(401).send({ message: "User not found" });
  }
});

//Another route
app.listen(PORT, HOST, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
