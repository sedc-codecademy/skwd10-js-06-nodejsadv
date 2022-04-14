const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const LIBRARY_PATH = path.join(__dirname, "..", "db", "library.json");

router.get("/all_books", (req, res) => {
  console.log("BEFORE WE MODIFY THE SESSION OBJECT", req.session);
  const allBooks = JSON.parse(
    fs.readFileSync(LIBRARY_PATH, { encoding: "utf-8" })
  ).books;
  //key  - //value
  req.session.adminUser = "Bob";

  isNaN(req.session.visits)
    ? (req.session.visits = 1)
    : (req.session.visits += 1);

  if (req.session.visits > 10) {
    req.session.premiumPromotion = true;
  }
  console.log("AFTER WE MODIFY THE SESSION OBJECT", req.session);

  res.send(allBooks);
});

module.exports = router;
