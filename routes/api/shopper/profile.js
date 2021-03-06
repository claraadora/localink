const express = require('express');
const router = express.Router();
const authShopper = require('../../../middleware/shopper/authShopper');
const { check } = require('express-validator');

const profileController = require('../../../controllers/shopper/profileController');

// @route    GET /profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', authShopper, profileController.getShopper);

// @route    POST profile/upload-avatar;
// @desc     Upload shopper profile avatar
// @access   Private, only owner
router.post('/upload-avatar', authShopper, profileController.uploadAvatar);

// @route    POST /profile/account-settings-email;
// @desc     Update email (account settings)
// @access   Private
router.post(
  '/account-settings-email',
  [authShopper, check('email', 'Please include a valid email').isEmail()],
  profileController.updateEmail
);

// @route    POST /profile/account-settings-password;
// @desc     Update password (account settings)
// @access   Private
router.post(
  '/account-settings-password',
  [
    authShopper,
    check('oldPassword', 'Please enter your existing password').isLength({
      min: 6
    }),
    check(
      'newPassword',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  profileController.updatePassword
);
module.exports = router;
