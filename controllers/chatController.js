const asyncHandler = require('express-async-handler');
const ChatMessage = require('../models/chatMessage');

//@ desc Post message
//@route POST/api/chat/send
//@access private
const sendMessage = asyncHandler(async (req, res) => {
    // Check if user is authenticated
    if (!req.user) {
        res.status(401);
        throw new Error('Please log in first');
    }

    const {
        message
    } = req.body;
    let response;

    if (message.toLowerCase().includes('register online for residency in kicukiro?')) {
        response = "Yes, you can register online for residency in Kicukiro.";
    } else if (message.toLowerCase().includes('process for online residency registration in kicukiro?')) {
        response = "The process for online residency registration in Kicukiro involves...";
    } else if (message.toLowerCase().includes('sectors in kicukiro?')) {
        response = "The sectors in Kicukiro are...";
    } else if (message.toLowerCase().includes('how many sectors are in kicukiro?')) {
        response = "There are [number] sectors in Kicukiro.";
    } else if (message.toLowerCase().includes('average cost of living in different sectors of kicukiro?')) {
        response = "The average cost of living in different sectors of Kicukiro varies...";
    } else if (message.toLowerCase().includes('affordable place to live in kicukiro?')) {
        response = "Certainly! Sectors like [sector names] generally have a lower cost of living.";
    } else if (message.toLowerCase().includes('map available that shows the infrastructure in different sectors of kicukiro?')) {
        response = "You can find a map showing the infrastructure in different sectors of Kicukiro at [link].";
    } else if (message.toLowerCase().includes('where can i find a map that shows the location of hospitals, schools, and public transportation in kicukiro?')) {
        response = "You can find a map showing the location of hospitals, schools, and public transportation in Kicukiro at [link].";
    } else if (message.toLowerCase().includes('reliable movers for my upcoming move?')) {
        response = "You can find reliable movers for your upcoming move by checking reviews and asking for recommendations.";
    } else if (message.toLowerCase().includes('typical steps involved in planning a move?')) {
        response = "The typical steps involved in planning a move include...";
    } else if (message.toLowerCase().includes('prepare for moving day?')) {
        response = "To prepare for moving day, you should...";
    } else if (message.toLowerCase().includes('tips for managing stress on moving day?')) {
        response = "To manage stress on moving day, consider...";
    } else if (message.toLowerCase().includes('last-minute tasks i should remember before the movers arrive?')) {
        response = "Some last-minute tasks to remember before the movers arrive include...";
    } else if (message.toLowerCase().includes('after i arrive at my new home?')) {
        response = "After you arrive at your new home, you should...";
    } else if (message.toLowerCase().includes('setting up utilities and services at my new address?')) {
        response = "You can set up utilities and services at your new address by...";
    } else if (message.toLowerCase().includes('register my change of address within kicukiro district?')) {
        response = "You can register your change of address within Kicukiro district by...";
    } else if (message.toLowerCase().includes('online form for notifying authorities of a move within kicukiro?')) {
        response = "You can notify authorities of a move within Kicukiro using the online form at [link].";
    } else if (message.toLowerCase().includes('transfer utilities to my new residence in kicukiro?')) {
        response = "You can transfer utilities (water, electricity) to your new residence in Kicukiro by...";
    } else if (message.toLowerCase().includes('typically cost to hire movers for a [specific size] move?')) {
        response = "The cost to hire movers for a [specific size] move is typically around [cost].";
    } else if (message.toLowerCase().includes('ways to save money on moving expenses?')) {
        response = "Some ways to save money on moving expenses include...";
    } else if (message.toLowerCase().includes('estimates for packing supplies and moving truck rental?')) {
        response = "The estimates for packing supplies and moving truck rental are...";
    } else {
        response = "I'm sorry, About that but you can Visit this Website: https://www.kicukiro.gov.rw/ ";
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