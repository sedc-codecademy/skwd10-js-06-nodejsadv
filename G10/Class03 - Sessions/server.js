const express = require("express");
const session = require("express-session");

/**
 * IF WE HAVE SECRETS, KEYS IN OUR SERVER SIDE
 * WE CAN HIDE THEM BY CREATING AND USING ENVIRONMENT VARIABLES.
 * FIRST STEP: INSTALL dotenv PACKAGE (npm install dotenv)
 * SECOND STEP: REQUIRE IT IN THE SERVER  ( require("dotenv").config(); )
 * THIRD STEP: CRETE .env FILE ON ROOT LEVEL.
 * IN THIS .env FILE AS KEY = VALUE PAIRS WE CAN CREATE OUR ENVIRONMENT VARIABLES
 * EXAMPLE: SECRET_API_KEY=qwel123mz-09921
 * AND USE IT IN OUR CODE AS process.env.SECRET_API_KEY
 * IF WE CONSOLE.LOG IT AS => console.log(process.env.SECRET_API_KEY) THE VALUE qwel123mz-09921 WILL BE PRINTED.
 *
 * IMPORTANT: IF WE HAVE SUCH FILE .env WE MUST NOT COMMIT IT ON GITHUB
 */
require("dotenv").config();

const app = express();

const libraryRoutes = require("./routes/library-routes");
// Session menagement can be done in nodejs with the express-session module.
// It helps us, to save data inside the session in a key-value format =)

/**
 * When we user express-session to generate session for us =)
 * few things are created:
 *  - It generates a session ID
 *  - It generetes a COOKIE, and this cookie will be saved in the client's side/browser
 *  - This cookie do not hold value, but just has the session ID (encrypted) as a value
 *  - It generates an EMPTY SESSION OBJECT that we can add data to it =)
 *        and this session object is living in the SERVER SIDE
 *
 * WE CAN ACCESS THE SESSION OBJECT THROUGH req.session =)
 * and freely add new properties INSIDE
 */

const twoHoursInMS = 2 * 60 * 60 * 1000;

const createSession = session({
  // In production the secret & name properties
  // should not be exposed like that
  // we should hide them

  // secret: "secure_session_id",
  // name: "private_session_name",

  // we used proccess.env to hide our secrets =)
  // same as the above code but secrets are our env/environment variables
  secret: process.env.SECRET_SESSION,
  name: process.env.SESSION_NAME,

  cookie: {
    //the value of the maxAge must be in miliseconds
    // maxAge: 2 * 60 * 1000,  => 2 minutes or 120000 miliseconds

    // 2 hours

    maxAge: twoHoursInMS,
  },
  saveUninitialized: true,
  resave: true,
});

app.use(createSession);

app.use(libraryRoutes);

console.log(process.env.SECRET_SESSION);
console.log(process.env.SESSION_NAME);

// console.log(process.env.FIRSTNAME);
// console.log(process.env.LASTNAME);

app.listen(3000, () => {
  console.log("Server is up and running...");
});
