const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const indexControllerBusiness = require('../../../controllers/business/indexControllerBusiness');

// @route    POST /business
// @desc     Register user
// @access   Public
// @return   User token
router.post(
  '/',
  [
    check('shopName', 'Shop name is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  indexControllerBusiness.registerBusiness
);

module.exports = router;
