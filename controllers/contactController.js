const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
const nodemailer = require('nodemailer');

//@ desc Get all contacts
//@route GET/api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    const totalUsers = contacts.length;
    res.status(200).json({
        totalUsers,
        contacts
    });

})

//@ desc Post all contacts
//@route POST/api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        natinalId,
        cellname
    } = req.body;

    if (!name || !email || !natinalId || !cellname) {
        res.status(400);
        throw new Error("All fields are Mandatory !!");
    }

    // Check if the email already exists in the database
    const existingContact = await Contact.findOne({
        email
    });
    const existingnId = await Contact.findOne({
        natinalId
    });

    if (existingContact || existingnId) {
        res.status(401);
        throw new Error(`You are already registered in ${cellname}, If your are moving out. Please choose Yes else No`);
    }

    // Create the contact if the email does not exist
    const contact = await Contact.create({
        name,
        email,
        natinalId,
        cellname,
        user_id: req.user.id
    });

    sendEmailNotification(contact);

    res.status(201).json(contact);
});

// Function to send email notification
const sendEmailNotification = (contact) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moveeaseapp@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'moveeaseapp@gmail.com',
        to: contact.email,
        subject: 'Register to New Cell',
        text: `Hello ${contact.name},\n\nYour Request to Register in ${contact.cellname} has been successfully Sent.\n\nThanks!`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {

    });
};

module.exports = {
    createContact
};


//@ desc Get a contact
//@route GET/api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not Found")
    }
    res.status(200).json(contact)
})

//@ desc update contact
//@route PUT/api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        }
    );
    res.status(200).json(updatedContact);
});

//@ desc delete Contact
//@route DELETE/api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update other contacts")
    }
    await Contact.deleteOne({
        _id: req.params.id
    });
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};