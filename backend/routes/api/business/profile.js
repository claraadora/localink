const express = require('express');
const router = express.Router();
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
      _id: req.user.id
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
router.post(
  '/',
  [
    auth,
    [
      check('shopName', 'Shop name is required'),
      check('address', 'Address is required')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { shopName, avatar, description, address } = req.body;

    const profileFields = {
      shopName
    };

    const shopFields = {
      avatar,
      description,
      address
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Business.findOneAndUpdate(
        { _id: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      ).select('-password');

      let shop = await Shop.findOneAndUpdate(
        { owner: profile.id },
        { $set: shopFields },
        { new: true, upsert: true }
      );

      profile.shop = shop.id;
      await profile.save();

      await Business.populate(profile, { path: 'shop', model: 'shop' });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//account settings
// // @route    POST business/profile/account;
// // @desc     Create or update user profile
// // @access   Private
// router.post('/account', auth, async (req, res) => {

module.exports = router;
