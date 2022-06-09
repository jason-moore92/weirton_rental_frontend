const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentalSchema = new Schema({

    // Property Owner Entity Name.
    contactFirstName: {type: String},
    contactLastName: {type: String},
    contactPhone: {type: String},
    contactEmail: {type: String},
    contactAddress: {type: String},
    contactCity: {type: String},
    contactState: {type: String},
    contactZip: {type: String},

    // Rental Property Building Info
    type: {type: String},                   // "Single Family" or "Multifamily"
    buildingAddress: {type: String},
    buildingCity: {type: String},
    buildingState: {type: String},
    buildingZip: {type: String},
    numberOfUnits: {type: Number},

    // Rent Units.
    rentUnits: [{
        apartmentNumber: {type: String},
        bedrooms: {type: String},
    }],

    createdAt: {type: Number},
});

// Export the model
module.exports = mongoose.model('Rental', RentalSchema);

