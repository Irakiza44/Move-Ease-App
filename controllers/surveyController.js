const asyncHandler = require('express-async-handler');
const Survey = require('../models/surveyModel');
const nodemailer = require('nodemailer');

// @desc    Post a survey
// @route   POST /api/surveys
// @access  private
const postSurvey = asyncHandler(async (req, res) => {
    const {
        cellName,
        transportation,
        movingCompanies,
        costOfFood,
        health,
        rentOfHouse
    } = req.body;

    // Create the survey
    const survey = await Survey.create({
        cellName,
        transportation,
        movingCompanies,
        costOfFood,
        health,
        rentOfHouse
    });
    sendResponseEmail(req, cellName);

    res.status(201).json({
        success: true,
        data: survey
    });
});

const sendResponseEmail = (req, cellName) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moveeaseapp@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'moveeaseapp@gmail.com',
        to: req.user.email,
        subject: 'Survey Response',
        text: `Hello ${req.user.email},\n\nThank you for completing the survey for ${cellName}. Your feedback is valuable to us.\n\nBest regards,\nThe Survey Team` // Email body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {

    });
};

// @desc    Get all surveys
// @route   GET /api/surveys
// @access  Public
const getSurveys = asyncHandler(async (req, res) => {
    const surveys = await Survey.find();
    res.status(200).json({
        success: true,
        data: surveys
    });
});

module.exports = {
    postSurvey,
    getSurveys,
};