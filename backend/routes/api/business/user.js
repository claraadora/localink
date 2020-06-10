const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

// const normalize = require('normalize-url');

const Business = require('../../../models/Business');
const User = require('../../../models/User');

// @route    POST /business/user
// @desc     Add user to existing business
// @access   Public
// @return   User token
router.post(
  '/',
  [
    auth,
    [
      check('role', 'Role is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { role, name, email, password } = req.body;

    try {
      const business = await Business.findById(req.user.id);

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User with that email already exists' }] });
      }

      const salt = await bcrypt.genSalt(10);

      const pw = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: pw,
        role
      });

      await user.save();

      business.users.push(user);

      await business.save();

      const payload = {
        business: {
          id: business.id,
          user_id: user.id
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

// @route    DELETE business/user/:user_id
// @desc     Deactivate user
// @access   Private
router.delete('/:user_id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.user.id);

    business.users.filter(user => {
      return user.toString() != req.params.user_id;
    });
    business.save();

    await User.findByIdAndDelete(req.params.user_id);

    res.status(200).json('Deactivated user successfully');
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//edit user
// @route    POST /business/user/:user_id
// @desc     Add user to existing business
// @access   Public
// @return   User token
router.post(
  '/:user_id',
  [
    auth,
    [
      check('role', 'Role is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    try {
      const { role, name, email } = req.body;
      const userFields = {
        role,
        name,
        email
      };
      const user = await User.findOneAndUpdate(
        { _id: req.params.user_id },
        { $set: userFields },
        { new: true }
      );

      res.status(200).json(user);
    } catch (error) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
