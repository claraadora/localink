const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//const config = require('config');
const { check, validationResult } = require('express-validator');

const Shopper = require('../../models/Shopper');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let shopper = await Shopper.findOne({ email });
      console.log('inside try');
      if (shopper) {
        console.log('inside shopper');
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      console.log('here');
      shopper = new Shopper({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      console.log('salted');

      shopper.password = await bcrypt.hash(password, salt);

      await shopper.save();

      res.send('User registered');
    } catch (error) {
      console.log('aw man');
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
