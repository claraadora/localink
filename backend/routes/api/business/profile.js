const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// const normalize = require('normalize-url');

const Business = require('../../../models/Business');
const Shop = require('../../../models/Shop');

// @route    GET business/profile/me
// @desc     Get current users profile
// @access   Private
// router.get('/me', auth, async (req, res) => {
//   try {
//     const profile = await Business.findOne({
//       _id: req.user.id
//     });

//     if (!profile) {
//       return res.status(400).json({ msg: 'There is no profile for this user' });
//     }

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route    GET business/profile/me
// @desc     Get current users shop (not profile)
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const shop = await Shop.findOne({
      owner: req.user.id
    });

    if (!shop) {
      return res.status(400).json({ msg: 'There is no shop for this user' });
    }

    res.json(shop);
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

      res.json(shop);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST business/profile/account-settings-email;
// @desc     Update email (account settings)
// @access   Private
router.post(
  '/account-settings-email',
  [auth, check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req); //converts errors into error object
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let business = await Business.findOne({ _id: req.user.id });

      if (!business) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      business.email = email;
      await business.save();

      res.json(business);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST business/profile/account-settings-password;
// @desc     Update password (account settings)
// @access   Private
router.post(
  '/account-settings-password',
  [
    auth,
    check('oldPassword', 'Please enter your existing password').isLength({
      min: 6
    }),
    check(
      'newPassword',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req); //converts errors into error object
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;

    try {
      let business = await Business.findOne({ _id: req.user.id });

      if (!business) {
        console.log('here');
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(oldPassword, business.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const salt = await bcrypt.genSalt(10);

      business.password = await bcrypt.hash(newPassword, salt);

      await business.save();

      const payload = {
        business: {
          id: business.id
        }
      };

      //Create token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
