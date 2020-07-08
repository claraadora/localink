const express = require('express');
const router = express.Router();
const accountActivationController = require('../../../controllers/business/accountActivationController');

// @route    GET account-activation/:activationToken
// @desc     Activation account link
// @access   Public
router.get('/:activationToken', accountActivationController.activateAccount);

module.exports = router;
