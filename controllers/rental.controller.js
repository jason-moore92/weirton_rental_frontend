// Load models.
const Rental = require("../models/rental.model");
const sgMail = require("@sendgrid/mail");
const sgConf = require("../config/sendgrid.config");

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

    //Send email to admin using sendgrid/mail
    sgMail.setApiKey(sgConf.API_KEY);

    let html = "<p>New weirton rental form was submitted.</p>";
    html += "<strong>First Name:</strong> " + contactFirstName;
    html += "<br/><strong>Last Name:</strong> " + contactLastName;
    html += "<br/><strong>Phone:</strong> " + contactPhone;
    html += "<br/><strong>Email:</strong> " + contactEmail;
    html += "<br/><strong>Address:</strong> " + contactAddress;
    html += "<br/><strong>City:</strong> " + contactCity;
    html += "<br/><strong>State:</strong> " + contactState;
    html += "<br/><strong>Zip Code:</strong> " + contactZip;

    const msg = {
        to: sgConf.ADMIN_EMAIL, // Change to your recipient
        from: sgConf.SENDER, // Change to your verified sender
        subject: "Weirton Rental Form",
        text: "New weirton rental form was submitted.",
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
        res.send(updatedContact);
    } catch (error) {
        res.json({ message: error });
    }
}

// Delect contact
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
