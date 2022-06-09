// Load models.
const Rental = require('../models/rental.model');

/////////////////////////////////////////////////////////////////////////
/////////////////////////// Submit Form /////////////////////////////////
/////////////////////////////////////////////////////////////////////////
async function submitForm(req, res) {
    const {
        contactFirstName,
        contactLastName,
        contactPhone,
        contactEmail,
        contactAddress,
        contactCity,
        contactState,
        contactZip,

        type,
        buildingAddress,
        buildingCity,
        buildingState,
        buildingZip,
        numberOfUnits,

        rentUnits,
    } = req.body;

    const r = new Rental();
    r.createdAt = Date.now();

    r.contactFirstName = contactFirstName;
    r.contactLastName = contactLastName;
    r.contactPhone = contactPhone;
    r.contactEmail = contactEmail;
    r.contactAddress = contactAddress;
    r.contactCity = contactCity;
    r.contactState = contactState;
    r.contactZip = contactZip;

    r.type = type;
    r.buildingAddress = buildingAddress;
    r.buildingCity = buildingCity;
    r.buildingState = buildingState;
    r.buildingZip = buildingZip;

    if (numberOfUnits) {
        r.numberOfUnits = numberOfUnits;
    }

    if (rentUnits) {
        r.rentUnits = rentUnits;
    }

    await r.save();
    res.json({
        result: true,
        rental: r,
    });
};

module.exports = {
    submitForm,
};
