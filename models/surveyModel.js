const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    cellName: {
        type: String,
        required: true,
    },
    transportation: {
        type: String,
        required: true,
    },
    movingCompanies: {
        type: String,
        required: true,
    },
    costOfFood: {
        type: String,
        required: true,
    },
    health: {
        type: String,
        required: true,
    },
    rentOfHouse: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;