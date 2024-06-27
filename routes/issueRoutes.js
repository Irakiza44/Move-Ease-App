const express = require('express');
const {
    submitIssue,
    getIssues
} = require('../controllers/issueController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/', validateToken, submitIssue);
router.get('/', validateToken, getIssues);

module.exports = router;