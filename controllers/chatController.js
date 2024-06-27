const asyncHandler = require('express-async-handler');
const ChatMessage = require('../models/chatMessage');

//@desc Post message
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

    const keywordResponses = {
        register: "Yes, you can register online for residency in Kicukiro.",
        process: "The process for online residency registration in Kicukiro involves...",
        sector: "The sectors in Kicukiro are...",
        "how many sectors": "There are [number] sectors in Kicukiro.",
        "cost of living": "The average cost of living in different sectors of Kicukiro varies...",
        affordable: "Certainly! Sectors like [sector names] generally have a lower cost of living.",
        map: "You can find a map showing the infrastructure in different sectors of Kicukiro at [link].",
        hospitals: "You can find a map showing the location of hospitals, schools, and public transportation in Kicukiro at [link].",
        movers: "You can find reliable movers for your upcoming move by checking reviews and asking for recommendations.",
        steps: "The typical steps involved in planning a move include...",
        prepare: "To prepare for moving day, you should...",
        stress: "To manage stress on moving day, consider...",
        tasks: "Some last-minute tasks to remember before the movers arrive include...",
        arrive: "After you arrive at your new home, you should...",
        utilities: "You can set up utilities and services at your new address by...",
        address: "You can register your change of address within Kicukiro district by...",
        form: "You can notify authorities of a move within Kicukiro using the online form at [link].",
        transfer: "You can transfer utilities (water, electricity) to your new residence in Kicukiro by...",
        cost: "The cost to hire movers for a [specific size] move is typically around [cost].",
        save: "Some ways to save money on moving expenses include...",
        estimates: "The estimates for packing supplies and moving truck rental are...",
        hello: "Hello, how can I assist you?"
    };

    const lowerCaseMessage = message.toLowerCase();
    response = "I'm sorry, About that but you can Visit this Website: https://www.kicukiro.gov.rw/";

    for (const keyword in keywordResponses) {
        if (lowerCaseMessage.includes(keyword)) {
            response = keywordResponses[keyword];
            break;
        }
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