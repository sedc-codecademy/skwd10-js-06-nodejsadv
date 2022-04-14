const router = require("express").Router();

router.post("/login", (req, res) => {
  const credentials = req.body;

  const users = [{ username: "qwerty", password: "qwerty" }];

  const userFound = users.find(
    (user) =>
      user.username === credentials.username &&
      user.password === credentials.password
  );

  if (userFound) {
    req.session.authenticated = true;
    res.send({ message: "User is successully logged in" });
  } else {
    req.session.authenticated = false;
    res.status(401).send({ message: "No user found" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("private_session_name");
  res.send({ message: "Logged out successfully =)" });
});

module.exports = router;
