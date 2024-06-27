const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cellName: {
        type: String,
        required: true
    },
    dateEncountered: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;