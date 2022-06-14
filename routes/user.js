const express = require("express");
const router = express.Router();
const auth = require("../config/auth.js");
const userController = require("../controllers/userController");

router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);

module.exports = router;
