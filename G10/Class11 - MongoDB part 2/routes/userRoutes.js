const express = require("express");
const router = express.Router();
const userControler = require("../controlers/userControler");

router.get("/users", userControler.getUsers);
router.post("/insertUser", userControler.createUser);
router.get("/users/:id", userControler.getUserById);
router.delete("/users/:id", userControler.deleteUserById);

module.exports = router;
