const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    cellName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfArrival: {
        type: Date,
        required: true
    },
    timeOfDeparture: {
        type: String,
        required: true
    },
    purposeOfVisit: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;