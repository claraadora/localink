const express = require('express');
const router = express.Router();
const {
  sendPasswordResetEmail,
  receivedNewPassword
} = require('./email.controller');

// @route    POST business/reset_password/:email
// @desc     Get email from frontend
// @access   Private
// @return
router.post('/:email', sendPasswordResetEmail);

// @route    POST business/reset_password/receive_new_password/:userId/:token
// @desc     Change password
// @access   Private
// @return
router.post('/receive_new_password/:userId/:token', receivedNewPassword);

module.exports = router;
