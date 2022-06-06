// Load models.
const Rental = require('../models/rental.model');

/////////////////////////////////////////////////////////////////////////
/////////////////////////// Submit Form /////////////////////////////////
/////////////////////////////////////////////////////////////////////////
async function submitForm(req, res) {
    const {
        contactFirstName,
        contactLastName,
        contactAddress,
        contactPhone,
        contactEmail,

        streetAddress,
        city,
        zip,
        type,
        numberOfUnits,

        apartmentNumber,
        bedrooms,
    } = req.body;

    const r = new Rental();
    r.createdAt = Date.now();
    r.contactFirstName = contactFirstName;
    r.contactLastName = contactLastName;
    r.contactAddress = contactAddress;
    r.contactPhone = contactPhone;
    r.contactEmail = contactEmail;
    r.streetAddress = streetAddress;
    r.city = city;
    r.zip = zip;
    r.type = type;
    if (numberOfUnits) {
        r.numberOfUnits = numberOfUnits;
    }

    if (apartmentNumber) {
        r.apartmentNumber = apartmentNumber;
    }

    if (bedrooms) {
        r.bedrooms = bedrooms;
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
