const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const indexController = require('../../../controllers/shopper/indexController');

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
  indexController.registerShopper
);

module.exports = router;
