const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;