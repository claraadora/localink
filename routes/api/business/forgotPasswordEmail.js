const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  sendPasswordResetEmail,
  receivedNewPassword
} = require('../../../controllers/email/email.controller');
const authBusiness = require('../../../middleware/business/authBusiness');
const resetPasswordAuth = require('../../../middleware/ResetPasswordAuth');

// @route    POST business/reset_password/:email
// @desc     Get email from frontend
// @access   Private, only owner
// @return
router.post('/:email', authBusiness, sendPasswordResetEmail);

// @route    POST business/reset_password/receive_new_password/:userId/:token
// @desc     Change password
// @access   Private, only owner
// @return
router.post(
  '/receive_new_password/:user_id/:token',
  [
    resetPasswordAuth,
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  receivedNewPassword
);

module.exports = router;
