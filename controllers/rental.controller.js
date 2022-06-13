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

module.exports = {
    submitForm,
};
