const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

router.get('/nearby', placeController.getNearbyPlaces);

module.exports = router;