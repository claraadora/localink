const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const accountActivationController = require('../../../controllers/shopper/accountActivationController');

// @route    GET account-activation/:activationToken
// @desc     Activation account link
// @access   Public
router.get('/:activationToken', accountActivationController.activateAccount);

module.exports = router;
