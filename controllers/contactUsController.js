const asyncHandler = require('express-async-handler');
const ContactUs = require('../models/contactUsModel');
const nodemailer = require('nodemailer');

// @desc    Submit contact-Us form
// @route   POST /api/contact-us
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        telephone
    } = req.body;

    if (!name || !email || !telephone) {
        res.status(400).json({
            message: 'Name, email, and telephone are required'
        });
        return;
    }

    try {
        // Create contact form entry in the database
        const contactForm = await ContactUs.create({
            name,
            email,
            telephone,
        });

        // Send email notification
        sendEmailNotification(contactForm);

        res.status(201).json({
            success: true,
            data: contactForm
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error submitting contact form'
        });
    }
});

// Function to send email notification
const sendEmailNotification = (contactForm) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moveeaseapp@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'moveeaseapp@gmail.com',
        to: contactForm.email,
        subject: 'Contact-Us Form Submission',
        text: `Name: ${contactForm.name}\nEmail: ${contactForm.email}\nTelephone: ${contactForm.telephone}\n\nThanks For Reaching Out We Will Contct you soon!!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {

    });
};

// @desc    Get all contact form submissions
// @route   GET /api/contact-us
// @access  Public
const getAllContactForms = asyncHandler(async (req, res) => {
    const contactForms = await ContactUs.find();
    res.status(200).json({
        success: true,
        data: contactForms
    });
});

module.exports = {
    submitContactForm,
    getAllContactForms,
};