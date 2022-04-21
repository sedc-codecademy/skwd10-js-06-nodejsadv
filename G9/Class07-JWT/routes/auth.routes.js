const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const userValidator = require("../middleware/user-validator.middleware");

router.post("/register", userValidator, AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/:id/logout", AuthController.logoutUser);
router.post("/refresh-token", AuthController.refreshAccessToken);

module.exports = router;
