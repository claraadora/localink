const express = require('express');
const router = express.Router();
const authShopper = require('../../../middleware/shopper/authShopper');

const emailController = require('../../../controllers/email/email.controller');

// @route    POST /final-route
// @desc     Send mobile gps navigation link to email
// @access   Private
router.post('/final-route', authShopper, emailController.sendURIEmail);

module.exports = router;
