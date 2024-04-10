// models/ChatMessage.js

const mongoose = require('mongoose');
const chatMessageSchema = mongoose.Schema({
    sender: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);