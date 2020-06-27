const express = require('express');
const router = express.Router();
const authBusiness = require('../../../middleware/authBusiness');
const { check } = require('express-validator');

const authControllerBusiness = require('../../../controllers/business/authControllerBusiness');

// @route    GET business/auth
// @desc     Get user by token (load user for frontend)
// @access   Private
// @return   User
router.get('/', authBusiness, authControllerBusiness.getUserByToken);

// @route    POST business/auth
// @desc     Authenticate user & get token (login)
// @access   Public
// @return   User token
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authControllerBusiness.login
);

module.exports = router;
