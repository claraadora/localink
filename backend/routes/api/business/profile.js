const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');
// const normalize = require('normalize-url');

const Business = require('../../../models/Business');
const Shop = require('../../../models/Shop');

// @route    GET business/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Business.findOne({
      owner: req.user.id
    }).populate('shop', ['avatar', 'description', 'address']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST business/profile;
// @desc     Create or update user profile
// @access   Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { shopName, avatar, description, address } = req.body;

  //   const newShop = new Shop({
  //     avatar: avatar,
  //     description: description,
  //     address: address
  //   });

  const profileFields = {
    owner: req.user.id,
    shopName
  };

  const shopFields = {
    avatar,
    description,
    address
  };

  //   profileFields.shop = newShop.id;

  console.log(profileFields);
  console.log(shopFields);

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Business.findOneAndUpdate(
      { _id: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    ).select('-password');

    try {
      let shop = await Shop.findOneAndUpdate(
        { owner: profile.id },
        // { _id: profile.shop },
        { $set: shopFields },
        { new: true, upsert: true }
      );
      profile.shop = shop.id;

      console.log(shop);

      await Business.populate(profile, { path: 'shop', model: 'Shop' });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
