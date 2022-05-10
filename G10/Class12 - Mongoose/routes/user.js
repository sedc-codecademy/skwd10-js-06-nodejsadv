const router = require("express").Router();
const userController = require("../controlers/user");

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.delete("/users/:id", userController.deleteUserById);
router.put("/users/:id/addProduct", userController.addProductToUser);

module.exports = router;
