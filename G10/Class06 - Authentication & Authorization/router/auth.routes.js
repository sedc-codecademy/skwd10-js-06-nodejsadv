const router = require("express").Router();
const path = require("path");

const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const fileService = require("../services/file-service");

const usersDB = path.join(__dirname, "..", "db", "users.json");

//localhost:3000/api/auth/register
router.post("/register", async (req, res) => {
  const credentials = req.body;

  // Check if credentaials are valid =)
  // if (credentials.username.length <= 5) {
  //   res.status(401).send({ message: "Username short " });
  // }
  // if (credentials.password.length <= 6) {
  //   res.status(401).send({ message: "password short " });
  // }

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

  //Filter HOF => is always returning ARRAY, and if the object/value we are searching for
  //is not found it will return still [] but empty
  // const usersFilter = [{ username: "George", isAdmin: true }];
  // usersFilter[0];

  //Find HOF => will return the object/value that we are searching for or if it is not existing
  //it will return undefined =)
  // const usersFind = { username: "George" };

  //Check if user exists
  // const user = users.find((u) => u.username === credentials.username);
  //some => boolean (true/false)
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

  //Read from db =)
  const users = fileService.readFile(usersDB);

  //Check if exists
  const user = users.find((u) => u.username === credentaials.username);

  if (!user) {
    return res.status(400).send({
      message: `User with the username ${credentaials.username} does not exist`,
    });
  }

  //Compare the passwords ;), compare the hashed one and the password from the credentials
  console.log("User pass of req.body:", credentaials.password);
  console.log("user pass from DB", user.password);

  const validPassword = await bcrypt.compare(
    credentaials.password,
    user.password
  );

  console.log(validPassword);
  //Check if password is valid
  if (!validPassword) {
    return res.status(404).send({ message: "Invalid credentials" });
  }

  // we can session and add the property req.session.authenticated = true;
  req.session.authenticated = true;

  res.send({ message: "User is logged in." });
  //later on maybe if we have SSR we will redirect the user to the /home page ;)

  //return a token to the user ;)
});

module.exports = router;
