require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors")

const { auth } = require("./authentication/auth");
const fileService = require("./fileService");

const app = express();

app.use(cors())
app.use(express.json());

app.post("/login", (req, res) => {
  const credentials = req.body;
  console.log(credentials)
  // Our dummy DB, it can be json file, real db etc.
  const users = [
    {
      username: "george",
      password: 12345,
      isAdmin: true,
      email: "geoge@mail.com",
    },
  ];

  const user = users.find(
    (userOfDb) =>
      userOfDb.username === credentials.username &&
      userOfDb.password === Number(credentials.password)
  );

  if (!user) {
    return res.status(401).send({ message: "User not found." });
  }

  // Here user is found and we can create our acess token

  const accessToken = jwt.sign(
    {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "15s" }
  );

  const refreshToken = jwt.sign(
    {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET
  );

  // We should save refresh token in our DB
  fileService.addToken(refreshToken);

  res.header("Authorization", accessToken).send({
    message: "Logged in",
    accessToken,
    refreshToken,
  });
});

app.get("/products", auth, (req, res) => {
  const products = [
    { name: "Milk", price: 55 },
    { name: "Banana", price: 60 },
    { name: "Bread", price: 30 },
  ];
  console.log("Here 1", req.user);

  res.send(products);
});

app.post("/refresh_token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).send({ message: "No token sent!" });
  }

  const refreshTokens = fileService.getTokens();

  if (!refreshTokens.includes(refreshToken)) {
    return res
      .status(403)
      .send({ message: "You are unauthorized please log in" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        return res
          .status(403)
          .send({ message: "You are unauthorized please log in" });
      }

      const accessToken = jwt.sign(
        {
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: "15s" }
      );

      res.header("Authorization", accessToken).send({
        message: "Refreshed token successfully generated new access token",
        accessToken,
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is up and running...");
});
