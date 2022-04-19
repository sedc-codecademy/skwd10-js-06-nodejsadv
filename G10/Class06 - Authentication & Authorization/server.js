//Authentication is the process of verifying who someone is =)

/**
 *
 * {username: "qwerty", password:"qwerty"} => Who are you? => Authentication
 *
 * What permissions do you have => Authorization ? Are you logged in? Are you admin?
 *
 */
// Store and use the credentials that user logged in, and grant access to some of the routes =)

/**
 * Common authentication types
 *
 * 1. Password-based authentication
 * 2. Multi-factor authentication
 * 3. Biometric authentication
 * 4. Token based authentication
 */

// Password-based authentication => STATEFUL req.session.authenticated = true
// Token basen authentication => STATELESS

//{username: "george", password: "123_qwerty"}

const express = require("express");

const router = require("./router.const");
const session = require("./session.const");

const app = express();

app.use(express.json());
app.use(session);

//localhost:3000/api/here_we_will_have_other_urls
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is up and running");
});
