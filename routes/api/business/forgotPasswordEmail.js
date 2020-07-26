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
router.post('/:email', sendPasswordResetEmail);

// @route    POST /business/reset_password/:token/:user_id
// @desc     Change password
// @access   Private, only owner
// @return
router.post(
  '/:token/:user_id',
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
