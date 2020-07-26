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
router.post('/start-location/:shopper_id', async (req, res) => {
  const shopper_id = req.params.shopper_id;

  const { currentLocation, startLocation } = req.body;
  let location = null;
  if (currentLocation === true) {
    location = await getCurrentLocation();
  } else {
    location = await geocode(startLocation);
  }
  try {
    const allShops = await Shop.find();
    allShops.forEach(async s => {
      let shop = s;
      if (shop.latLng.lat && shop.latLng.lng) {
        const dist = await getDistance(location, shop.latLng);

        shop.distance = shop.distance.filter(obj => {
          return obj && !obj[shopper_id];
        });

        // shop.distance = arr;
        await shop.save();

        const distObj = {
          [shopper_id]: dist
        };
        shop.distance.push(distObj);
        await shop.save();
      }
    });

    res.status(200).json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// // @route    POST start-location
// // @desc     Get the start location, update shopper's location
// // @access   Private
// // @return   User
// router.post('/remove-start-location/:shopper_id', async (req, res) => {
//   try {
//     const allShops = await Shop.find();
//     allShops.forEach(shop => {
//       shop.distance = shop.distance.filter(obj => {
//         return obj && !obj[shopper_id];
//       });
//       await shop.save();
//     });
//     res.status(200).json('successful');
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ errors: [{ msg: 'Server Error' }] });
//   }
// });

module.exports = router;
