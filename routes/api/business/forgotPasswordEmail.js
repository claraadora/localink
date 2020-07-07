const express = require('express');
const router = express.Router();
const {
  sendPasswordResetEmail,
  receivedNewPassword
} = require('../../../controllers/email/email.controller');
const checkBusinessOwner = require('../../../middleware/business/CheckBusinessOwner');
const resetPasswordAuth = require('../../../middleware/ResetPasswordAuth');

// @route    POST business/reset_password/:email
// @desc     Get email from frontend
// @access   Private, only owner
// @return
router.post('/:email', checkBusinessOwner, sendPasswordResetEmail);

// @route    POST business/reset_password/receive_new_password/:userId/:token
// @desc     Change password
// @access   Private, only owner
// @return
router.post(
  '/receive_new_password/:user_id/:token',
  resetPasswordAuth,
  receivedNewPassword
);

module.exports = router;
