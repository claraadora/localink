const express = require('express');
const router = express.Router();

const getCurrentLocation = require('./geolocation');

// @route    POST start-location
// @desc     Get the start location then calculate distance to shop
// @access   Private
// @return   User
router.post('/start-location', async (req, res) => {
  const { currentLocation, startLocation } = req.body;
  if (currentLocation) {
    const location = await getCurrentLocation();
    console.log(location);
  }
  const geocoder = new google.maps.Geocoder();
});

module.exports = router;
