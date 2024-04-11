const express = require('express');
const router = express.Router();
const {
    submitContactForm,
    getAllContactForms
} = require('../controllers/contactUsController');


router.post('/', submitContactForm);
router.get('/', getAllContactForms);

module.exports = router;