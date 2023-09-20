const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");



router.post("/validate", UsersController.validateUser);

module.exports = router;

