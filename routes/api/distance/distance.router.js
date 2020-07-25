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
    // let shopper = await Shopper.findOneAndUpdate(
    //   { _id: req.user.id },
    //   { latLng: location },
    //   { new: true }
    // );

    //console.log('Successfully updated location of shopper');

    const allShops = await Shop.find();
    allShops.forEach(async shop => {
      let key = null;
      if (shop.latLng.lat && shop.latLng.lng) {
        const dist = await getDistance(location, shop.latLng);
        //remove in future
        console.log(shop.distance);
        const found = shop.distance.find(obj => {
          const distObj = Object.keys(obj).find(key => {
            console.log(shopper_id);
            return key == shopper_id;
          });
          key = Object.keys(distObj)[0];
          console.log(key);
          return distObj ? distObj.distance : 'null';
        });
        console.log('found:');
        console.log(found);
        if (found == 'null') {
          console.log('not found');
          const distObj = {
            [shopper_id]: dist
          };
          shop.distance.push(distObj);
          await shop.save();
          console.log(shop);
        } else {
          shop.distance.forEach(obj => {
            if (obj.shopper_id == key) {
              obj.distance = dist;
            }
          });
        }

        //console.log(shop.distance);
      }
      // console.log(
      //   shop.distance.find(shopper => {
      //     console.log(shopper.shopper_id);
      //     console.log(shopper_id);
      //     return shopper.shopper_id == shopper_id;
      //   }).distance
      // );
    });
    //console.log('Successfully updated distance to shops');

    res.status(200).json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

module.exports = router;
