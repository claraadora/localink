const express = require('express');
const router = express.Router();
const {
  sendPasswordResetEmail,
  receivedNewPassword
} = require('../../../controllers/email/email.controller');
const authShopper = require('../../../middleware/shopper/authShopper');
const resetPasswordAuth = require('../../../middleware/ResetPasswordAuth');

// @route    POST /reset_password/:email
// @desc     Get email from frontend
// @access   Private
// @return
router.post('/:email', sendPasswordResetEmail);

// @route    POST /reset_password/:token/:user_id
// @desc     Change password
// @access   Private, only owner
// @return
router.post(
  '/receive_new_password/:token/:user_id',
  resetPasswordAuth,
  receivedNewPassword
);

module.exports = router;
