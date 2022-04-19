const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const userValidator = require("../middleware/user-validator.middleware");

router.post("/register", userValidator, AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);

module.exports = router;
