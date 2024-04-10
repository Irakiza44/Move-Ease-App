// middleware/chatLogger.js

const ChatMessage = require('../models/chatMessage');

const chatLogger = async (req, res, next) => {
    try {
        const {
            sender,
            message
        } = req.body;
        const newMessage = new ChatMessage({
            sender,
            message
        });
        await newMessage.save();
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = chatLogger;