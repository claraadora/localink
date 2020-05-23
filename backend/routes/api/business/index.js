const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// const normalize = require('normalize-url');

const Business = require('../../../models/Business');

// @route    POST /business
// @desc     Register user
// @access   Public
// @return   User token
router.post(
  '/',
  [
    check('shopName', 'Shop name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req); //converts errors into error object
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { shopName, email, password } = req.body;

    try {
      let business = await Business.findOne({ email });
      if (business) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      business = new Business({
        shopName,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      business.password = await bcrypt.hash(password, salt);

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
