const express = require("express");
const router = express.Router();
const HouseholdController = require("../controllers/household.controller");
const passport = require("passport");

router.post(
  "/new",
  HouseholdController.addNew
);

module.exports = router;
