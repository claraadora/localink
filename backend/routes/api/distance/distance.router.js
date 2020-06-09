const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

const getCurrentLocation = require('./geolocation');
const geocode = require('./geocode');

// @route    POST start-location
// @desc     Get the start location, update shopper's location
// @access   Private
// @return   User
router.post('/start-location', auth, async (req, res) => {
  const { currentLocation, startLocation } = req.body;
  let location = null;
  if (currentLocation == 'true') {
    location = await getCurrentLocation();
  } else {
    location = await geocode(startLocation);
  }
  try {
    let shopper = await Shopper.findOneAndUpdate(
      { _id: req.user.id },
      { latLng: location },
      { new: true }
    );
    console.log(shopper);
    console.log('Successfully updated location of shopper');
    res.status(200).send('Got location successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
