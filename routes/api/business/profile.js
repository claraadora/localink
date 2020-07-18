const express = require('express');
const router = express.Router();
const authBusiness = require('../../../middleware/business/authBusiness');
const checkBusinessOwner = require('../../../middleware/business/CheckBusinessOwner');
const { check } = require('express-validator');

const profileControllerBusiness = require('../../../controllers/business/profileControllerBusiness');

// @route    GET business/profile/me
// @desc     Get current users shop (not profile, profile is business)
// @access   Private
router.get('/me', authBusiness, profileControllerBusiness.getShop);

// @route    POST business/profile;
// @desc     Create or update user profile
// @access   Private, only owner
router.post(
  '/',
  [
    checkBusinessOwner,
    [
      check('shopName', 'Shop name is required'),
      check('address', 'Address is required')
    ]
  ],
  profileControllerBusiness.createOrUpdateProfile
);

// @route    POST business/profile/account-settings-email;
// @desc     Update email (account settings)
// @access   Private
router.post(
  '/account-settings-email',
  [authBusiness, check('email', 'Please include a valid email').isEmail()],
  profileControllerBusiness.updateEmail
);

// @route    POST business/profile/account-settings-password;
// @desc     Update password (account settings)
// @access   Private
router.post(
  '/account-settings-password',
  [
    authBusiness,
    check('oldPassword', 'Please enter your existing password').isLength({
      min: 6
    }),
    check(
      'newPassword',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  profileControllerBusiness.updatePassword
);

module.exports = router;
