const asyncHandler = require('express-async-handler');
const Issue = require('../models/Issue');
const nodemailer = require('nodemailer');

// Function to send an email
const sendEmail = async (issue) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'moveeaseapp@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: 'moveeaseapp@gmail.com',
        to: issue.email,
        subject: 'Issue Submitted Successfully',
        text: `Dear ${issue.fullName},\n\nThank you for submitting your issue. We will get back to you shortly.\n\nBest Regards,\nSupport Team`
    };

    await transporter.sendMail(mailOptions);
};

// @desc    Submit an issue
// @route   POST /api/issues
// @access  Private
const submitIssue = asyncHandler(async (req, res) => {
    const {
        fullName,
        phoneNumber,
        email,
        cellName,
        dateEncountered,
        description
    } = req.body;

    if (!fullName || !phoneNumber || !email || !cellName || !dateEncountered || !description) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const newIssue = new Issue({
        fullName,
        phoneNumber,
        email,
        cellName,
        dateEncountered,
        description
    });

    await newIssue.save();
    await sendEmail(newIssue);

    res.status(201).json({
        success: true,
        message: 'Issue submitted successfully',
        issue: newIssue
    });
});

// @desc    Get all issues
// @route   GET /api/issues
// @access  Private
const getIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find();
    res.status(200).json({
        success: true,
        issues
    });
});

module.exports = {
    submitIssue,
    getIssues
};