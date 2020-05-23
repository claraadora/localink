const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// const normalize = require('normalize-url');

const Shopper = require('../../../models/Shopper');

// @route    POST /
// @desc     Register user
// @access   Public
// @return   User token
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
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

    const { name, email, password } = req.body;

    try {
      let shopper = await Shopper.findOne({ email });
      if (shopper) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      shopper = new Shopper({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      shopper.password = await bcrypt.hash(password, salt);

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
