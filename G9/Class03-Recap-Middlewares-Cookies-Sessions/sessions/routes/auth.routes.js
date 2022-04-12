const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.loginUser);

module.exports = router;
