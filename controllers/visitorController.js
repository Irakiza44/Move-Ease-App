const asyncHandler = require('express-async-handler');
const Visitor = require('../models/visitorModel');
const nodemailer = require('nodemailer');

// Function to send an email
const sendVisitorEmail = async (visitor, userEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'moveeaseapp@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: 'moveeaseapp@gmail.com',
        to: userEmail,
        subject: 'Visitor Registered Successfully',
        text: `Dear ${userEmail},\n\nThank you for registering your visit. We will get back to you shortly.\n\nBest Regards,\nMove Ease App Team`
    };

    await transporter.sendMail(mailOptions);
};

// @desc    Register a visitor
// @route   POST /api/visitors
// @access  Private
const registerVisitor = asyncHandler(async (req, res) => {
    const {
        fullName,
        contactNumber,
        cellName,
        address,
        dateOfArrival,
        timeOfDeparture,
        purposeOfVisit
    } = req.body;

    if (!fullName || !contactNumber || !cellName || !address || !dateOfArrival || !timeOfDeparture || !purposeOfVisit) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    try {
        const newVisitor = new Visitor({
            fullName,
            contactNumber,
            cellName,
            address,
            dateOfArrival,
            timeOfDeparture,
            purposeOfVisit
        });

        await newVisitor.save();
        await sendVisitorEmail(newVisitor, req.user.email);

        res.status(201).json({
            success: true,
            message: 'Visitor registered successfully',
            visitor: newVisitor
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error registering visitor'
        });
    }
});

// @desc    Get all visitors
// @route   GET /api/visitors
// @access  Private
const getVisitors = asyncHandler(async (req, res) => {
    const visitors = await Visitor.find();
    res.status(200).json({
        success: true,
        visitors
    });
});

module.exports = {
    registerVisitor,
    getVisitors
};