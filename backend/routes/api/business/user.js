const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const checkBusinessOwner = require('../../../middleware/checkBusinessOwner');
const checkObjectId = require('../../../middleware/CheckObjectId');

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
    checkBusinessOwner,
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
        role,
        activated: true
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
// @desc     Delete user
// @access   Private
router.delete(
  '/:user_id',
  [checkBusinessOwner, checkObjectId('user_id')],
  async (req, res) => {
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
  }
);

// @route    POST /business/user/:user_id
// @desc     Edit user of existing business
// @access   Public
// @return   User token
router.post(
  '/:user_id',
  [
    checkBusinessOwner,
    checkObjectId('user_id'),
    [
      (check('role', 'Role is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty())
      // check('email', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    try {
      const { role, name } = req.body;
      const userFields = {
        role,
        name
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

//activate and deactivate user
// @route    POST /business/user/:user_id
// @desc     Edit user of existing business
// @access   Public
// @return   User token
router.get(
  '/:user_id',
  [checkBusinessOwner, checkObjectId('user_id')],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      user.activated = !user.activated;
      user.save();
      res.status(200).json('successfully changed user activation status');
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
