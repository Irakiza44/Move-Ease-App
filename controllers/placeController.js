const axios = require('axios');
const {
    mapApiKey
} = require('../config/keys');

//@ desc Get all contacts
// @GET /api/places/nearby
//@access public
const getNearbyPlaces = async (req, res, next) => {
    try {
        const {
            latitude,
            longitude,
            type
        } = req.query;
        const radius = 5000;
        const apiKey = mapApiKey;
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const places = response.data.results;
        res.status(200).json({
            success: true,
            places
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNearbyPlaces
};