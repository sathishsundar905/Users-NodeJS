const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const auth = require("../middleware/auth");

router.post("/",auth, UsersController.createUser);
router.get("/",auth, UsersController.getUsers);
router.get("/:userId",auth, UsersController.getUserById);
router.put("/:userId",auth, UsersController.updateUser);
router.delete("/:userId",auth, UsersController.deleteUser);

module.exports = router;

