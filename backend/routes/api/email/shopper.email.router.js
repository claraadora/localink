const express = require('express');
const router = express.Router();
const {
  sendPasswordResetEmail,
  receivedNewPassword
} = require('./email.controller');
const auth = require('../../../middleware/auth');
const resetPasswordAuth = require('../../../middleware/ResetPasswordAuth');

// @route    POST /reset_password/:email
// @desc     Get email from frontend
// @access   Private
// @return
router.post('/:email', auth, sendPasswordResetEmail);

// @route    POST /reset_password/receive_new_password/:userId/:token
// @desc     Change password
// @access   Private, only owner
// @return
router.post(
  '/receive_new_password/:user_id/:token',
  resetPasswordAuth,
  receivedNewPassword
);

module.exports = router;
