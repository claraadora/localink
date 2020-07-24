const express = require('express');
const router = express.Router();
const authShopper = require('../../../middleware/shopper/authShopper');

const getCurrentLocation = require('./geolocation');
const geocode = require('./geocode');
const getDistance = require('../distance/distance');

// @route    POST start-location
// @desc     Get the start location, update shopper's location
// @access   Private
// @return   User
router.post('/start-location', async (req, res) => {
  const { currentLocation, startLocation } = req.body;
  let location = null;
  if (currentLocation === true) {
    location = await getCurrentLocation();
  } else {
    location = await geocode(startLocation);
  }
  try {
    // let shopper = await Shopper.findOneAndUpdate(
    //   { _id: req.user.id },
    //   { latLng: location },
    //   { new: true }
    // );

    //console.log('Successfully updated location of shopper');

    const allShops = await Shop.find();
    allShops.forEach(async shop => {
      if (shop.latLng.lat && shop.latLng.lng) {
        //remove in future
        shop.distance = await getDistance(location, shop.latLng);
        await shop.save();
      }
    });
    //console.log('Successfully updated distance to shops');

    res.status(200).json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

module.exports = router;
