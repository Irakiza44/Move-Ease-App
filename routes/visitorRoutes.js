const express = require('express');
const {
    registerVisitor,
    getVisitors
} = require('../controllers/visitorController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/', validateToken, registerVisitor);
router.get('/', validateToken, getVisitors);

module.exports = router;