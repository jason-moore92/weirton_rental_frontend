// Load models.
const Rental = require("../models/rental.model");
const sgMail = require("@sendgrid/mail");
const sgConf = require("../config/sendgrid.config");
sgMail.setApiKey(sgConf.API_KEY);
const {FAMILY_TYPE} = require('../config');

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

    sendEmailNotification(r);

    res.json({
        result: true,
        rental: r,
    });
}

async function sendEmailNotification(r) {
    let html = "<p>New weirton rental form was submitted.</p><br/>";

    // Property Owner.
    html += "<p>=========== Property Owner ==============</p>";
    html += "<strong>First Name:</strong> " + r.contactFirstName;
    html += "<br/><strong>Last Name:</strong> " + r.contactLastName;
    html += "<br/><strong>Phone:</strong> " + r.contactPhone;
    html += "<br/><strong>Email:</strong> " + r.contactEmail;
    html += "<br/><strong>Address:</strong> " + r.contactAddress;
    html += "<br/><strong>City:</strong> " + r.contactCity;
    html += "<br/><strong>State:</strong> " + r.contactState;
    html += "<br/><strong>Zip Code:</strong> " + r.contactZip;

    // Rental Property Building Info.
    html += "<br/><br/><p>=========== Rental Property Building Info ==============</p>";
    html += "<strong>Type:</strong> " + r.type;
    html += "<br/><strong>Address:</strong> " + r.buildingAddress;
    html += "<br/><strong>City:</strong> " + r.buildingCity;
    html += "<br/><strong>State:</strong> " + r.buildingState;
    html += "<br/><strong>Zip Code:</strong> " + r.buildingZip;
    if (r.type === FAMILY_TYPE.MULTI) {
        html += "<br/><strong>Number of Units:</strong> " + r.numberOfUnits;
    }    

    // Rent Units.
    html += "<br/><br/><p>=========== Rent Units ==============</p>";
    if (r.type === FAMILY_TYPE.SINGLE) {
        html += "<strong>Address:</strong> " + r.buildingAddress;
        html += "<br/><strong>City:</strong> " + r.buildingCity;
        html += "<br/><strong>State:</strong> " + r.buildingState;
        html += "<br/><strong>Zip Code:</strong> " + r.buildingZip;
    }
    else if(r.type === FAMILY_TYPE.MULTI && r.rentUnits && r.rentUnits.length > 0){
        r.rentUnits.forEach((item, index) => {
            html += `<br/><strong>Apartment Number #${index + 1}:</strong> ` + item.apartmentNumber;
            html += `<br/><strong>Bedrooms #${index + 1}:</strong> ` + item.bedrooms;
        });
    }

    const msg = {
        to: sgConf.ADMIN_EMAIL,
        from: sgConf.SENDER,
        subject: "Weirton Rental Form",
        html: html,
    };
    
    sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
    })
    .catch((error) => {
        console.error(error);
    });
}

// Get contact list
async function getContacts(req, res) {
    try {
        Rental.find().then((data) => res.send(data));
    } catch (error) {
        res.json({ message: error });
    }
}

// Get one contact by id
async function getContact(req, res) {
    try {
        Rental.findById(req.params.contactId).then((data) => res.send(data));
    } catch (error) {
        res.json({ message: error });
    }
}

// Update contact with id
async function updateContact(req, res) {
    try {
        const contact = {
            contactFirstName: req.body.contactFirstName,
            contactLastName: req.body.contactLastName,
            contactPhone: req.body.contactPhone,
            contactEmail: req.body.contactEmail,
            contactAddress: req.body.contactAddress,
            contactCity: req.body.contactCity,
            contactState: req.body.contactState,
            contactZip: req.body.contactZip,

            type: req.body.type,
            buildingAddress: req.body.buildingAddress,
            buildingCity: req.body.buildingCity,
            buildingState: req.body.buildingState,
            buildingZip: req.body.buildingZip,
            numberOfUnits: req.body.numberOfUnits,
            rentUnits: req.body.rentUnits,
        };
        const updatedContact = await Rental.findByIdAndUpdate(
            { _id: req.params.contactId },
            contact
        );
        res.send(contact);
    } catch (error) {
        res.json({ message: error });
    }
}

// Delect contract
async function deleteContact(req, res) {
    try {
        const id = req.params.contactId;
        const removeContact = await Rental.findByIdAndRemove(id);
        res.send(removeProduct);
    } catch (error) {
        res.json({ message: error });
    }
}

module.exports = {
    submitForm,
    getContacts,
    getContact,
    updateContact,
    deleteContact,
};
