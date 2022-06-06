const express = require('express');
const router = express.Router();
const RentalController = require('../controllers/rental.controller');

router.post('/submit_form', RentalController.submitForm);

module.exports = router;
