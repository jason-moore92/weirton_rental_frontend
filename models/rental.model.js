const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentalSchema = new Schema({

    // Property Owner Entity Name.
    contactFirstName: {type: String},
    contactLastName: {type: String},
    contactAddress: {type: String},
    contactPhone: {type: String},
    contactEmail: {type: String},

    // Rental Property Building Info
    streetAddress: {type: String},
    city: {type: String},
    zip: {type: String},
    type: {type: String},                   // "Single Family" or "Multifamily"
    numberOfUnits: {type: Number},

    // Rent Units.
    apartmentNumber: {type: String},
    bedrooms: {type: Number},

    createdAt: {type: Number},
});

// Export the model
module.exports = mongoose.model('Rental', RentalSchema);

