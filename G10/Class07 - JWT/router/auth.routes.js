const router = require("express").Router();
const path = require("path");

const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const fileService = require("../services/file-service");

const usersDB = path.join(__dirname, "..", "db", "users.json");

const jwt = require("jsonwebtoken");

//localhost:3000/api/auth/register
router.post("/register", async (req, res) => {
  const credentials = req.body;

  //Check if credentials are valid using JOI
  //Do use JOI we have to create our schema
  const schema = joi.object({
    username: joi.string().min(6),
    password: joi.string().min(5),
    //email
    //fullname
    //address
  });

  //Next step validate the schema with the give values (credentials)
  const validation = schema.validate(credentials);
  console.log(validation);
  if (validation.error) {
    return res
      .status(400)
      .send({ message: validation.error.details[0].message });
  }

  //Read from db =)
  const users = fileService.readFile(usersDB);

  //Check if user exists
  const exists = users.some((u) => u.username === credentials.username);

  if (exists) {
    return res.status(400).send({
      message: `User with the username ${credentials.username} already exists`,
    });
  }

  //Create the user
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(credentials.password, salt);
  console.log(hashedPassword);
  const user = {
    id: uuid(),
    username: credentials.username,
    password: hashedPassword,
  };

  console.log(user);

  const usersToBeSaved = [...users, user];
  //Save back to DB users
  fileService.writeFile(usersDB, usersToBeSaved);

  res.status(201).send({ message: "User is registered successfully." });
});

router.post("/login", async (req, res) => {
  const credentaials = req.body;
  console.log(1, credentaials);
  //Read from db =)
  const users = fileService.readFile(usersDB);

  //Check if exists
  const user = users.find((u) => u.username === credentaials.username);

  if (!user) {
    return res.status(400).send({
      message: `User with the username ${credentaials.username} does not exist`,
    });
  }

  const validPassword = await bcrypt.compare(
    credentaials.password,
    user.password
  );

  console.log(validPassword);
  //Check if password is valid
  if (!validPassword) {
    return res.status(404).send({ message: "Invalid credentials" });
  }

  //return a token to the user ;)

  //imagine JWT (JSON web token) as our passport

  const jwtOptions = {
    id: user.id,
    username: user.username,
  };

  const accessToken = jwt.sign(jwtOptions, "important_jwt_secret", {
    expiresIn: "10s",
  });

  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    "important_jwt_refresh_secret"
  );

  // we only store in our DB our refresh token
  fileService.addToken(refreshToken);

  // set res header: FIELD        VALUE
  res.header("Authorization", accessToken).send({
    message: "Logged in",
    accessToken,
    refreshToken,
  });
});

//new route here to generate the user a new access token

/**
 * 1. To generate a new acess token the user MUST provide the refresh token =)
 */

/**
 *  /refresh_token is going to generate a BRAND NEW acess token to the user
 *  BUT IT WILL ASK FOR THE REFRESH TOKEN
 *  IF THE USER DO NOT PROVIDE THE REFRESH TOKEN WE WILL RETURN ERR MSG
 *  IF THE USER PROVIDES REFRESH TOKEN
 *  WE CHECK IF WE HAVE IT IN OUR DATABASE
 *  IF WE HAVE ONLY THEN WE ARE GOING TO CREATE BRAND NEW ACCESS TOKEN
 */
router.post("/refresh_token", (req, res) => {
  // we ask for the refreshToken
  const refreshToken = req.body.refreshToken;

  // if not exists we return error
  if (!refreshToken) {
    return res.status(401).send({ message: "Token is not valid" });
  }

  // we read all refresh tokens from db
  const refreshTokens = fileService.getTokens();

  // if we do not have it in our db we return once again error
  if (!refreshTokens.includes(refreshToken)) {
    return res
      .status(403)
      .send({ message: "You are unatuthorized! Please log in" });
  }

  // if we have it we validate it/verify it
  jwt.verify(refreshToken, "important_jwt_refresh_secret", (err, user) => {
    if (err) {
      //if invalid we send back error
      return res
        .status(403)
        .send({ message: "You are unatuthorized! Please log in" });
    }

    //if it is valid we create BRAND NEW access token
    const brandNewAcessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      "important_jwt_secret",
      {
        expiresIn: "20s",
      }
    );

    // and send it back to the user =)
    res.header("Authorization", brandNewAcessToken).send({
      message: "Created brand new access token thx to the refresh one",
      accessToken: brandNewAcessToken,
    });
  });
});
module.exports = router;
