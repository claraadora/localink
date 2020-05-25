const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// const normalize = require('normalize-url');

const Shopper = require('../../../models/Shopper');
const Shop = require('../../../models/Shop');

// @route    POST /profile/account-settings;
// @desc     Update email and password (account settings)
// @access   Private
router.post(
  '/account-settings',
  [
    auth,
    check('email', 'Please include a valid email').isEmail(),
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

    const { email, oldPassword, newPassword } = req.body;

    try {
      let shopper = await Shopper.findOne({ _id: req.user.id });

      if (!shopper) {
        console.log('here');
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(oldPassword, shopper.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const salt = await bcrypt.genSalt(10);

      business.password = await bcrypt.hash(newPassword, salt);

      shopper.email = email;

      await shopper.save();

      const payload = {
        shopper: {
          id: shopper.id
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
