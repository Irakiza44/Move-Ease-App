const asyncHandler = require('express-async-handler');
const ChatMessage = require('../models/chatMessage');

const sendMessage = asyncHandler(async (req, res) => {
    // Check if user is authenticated
    if (!req.user) {
        res.status(401)
        throw new Error('Please log in first');
    }
    const {
        message
    } = req.body;
    let response;
    switch (message.toLowerCase()) {
        case 'hello':
            response = "Hi there! How can I assist you?";
            break;
        case 'how are you?':
            response = "I'm doing well, thank you for asking!";
            break;
        default:
            response = "I'm sorry, I didn't understand that.";
            break;
    }

    const newMessage = new ChatMessage({
        message: message
    });
    await newMessage.save();
    res.status(200).json({
        success: true,
        message: response
    });
});

module.exports = {
    sendMessage
};