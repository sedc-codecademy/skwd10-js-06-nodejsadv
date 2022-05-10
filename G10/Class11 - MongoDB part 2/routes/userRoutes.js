const express = require("express");
const router = express.Router();
const userControler = require("../controlers/userControler");

router.get("/users", userControler.getUsers);
router.post("/insertUser", userControler.createUser);

module.exports = router;
