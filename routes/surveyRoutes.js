const express = require('express');
const router = express.Router();
const {
    postSurvey,
    getSurveys
} = require('../controllers/surveyController');
const validateToken = require('../middleware/validateTokenHandler');

router.get('/', getSurveys);
router.use(validateToken)
router.post('/', postSurvey);

module.exports = router;