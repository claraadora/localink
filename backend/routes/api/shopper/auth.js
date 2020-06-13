const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authShopper = require('../../../middleware/authShopper');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Shopper = require('../../../models/Shopper');

// @route    GET /auth
// @desc     Get user by token (load user for frontend)
// @access   Private
// @return   User
router.get('/', authShopper, async (req, res) => {
  try {
    const shopper = await Shopper.findById(req.user.id);
    res.json(shopper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST /auth
// @desc     Authenticate user & get token (login)
// @access   Public
// @return   User token
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let shopper = await Shopper.findOne({ email });

      if (!shopper) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, shopper.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        shopper: {
          id: shopper.id
        }
      };

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
