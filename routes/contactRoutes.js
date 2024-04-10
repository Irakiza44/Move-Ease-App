const express = require('express');
const router = express.Router()
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.route('/').get(getContacts)
router.use(validateToken)
router.route('/').post(createContact)
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;