const express = require("express");
const router = express.Router();
const RentalController = require("../controllers/rental.controller");
const passport = require("passport");

router.post("/submit_form", RentalController.submitForm);

//Get all contacts
router.get(
    "/",
    passport.authenticate("jwt", {
        session: false,
    }),
    RentalController.getContacts
);

//Get one contact by ID
router.get(
    "/:contactId",
    passport.authenticate("jwt", {
        session: false,
    }),
    RentalController.getContact
);

//Update contact
router.put(
    "/:contactId",
    passport.authenticate("jwt", {
        session: false,
    }),
    RentalController.updateContact
);

//Delete contact
router.delete(
    "/:contactId",
    passport.authenticate("jwt", {
        session: false,
    }),
    RentalController.deleteContact
);

module.exports = router;
