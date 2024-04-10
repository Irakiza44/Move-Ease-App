const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/send', validateToken, chatController.sendMessage);

module.exports = router;