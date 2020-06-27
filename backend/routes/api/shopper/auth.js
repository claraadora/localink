const express = require('express');
const router = express.Router();
const authShopper = require('../../../middleware/authShopper');

const { check } = require('express-validator');

const authController = require('../../../controllers/shopper/authController');

// @route    GET /auth
// @desc     Get user by token (load user for frontend)
// @access   Private
// @return   User
router.get('/', authShopper, authController.getUserByToken);

// @route    POST /auth
// @desc     Authenticate user & get token (login)
// @access   Public
// @return   User token
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

// @route    GET /auth/google-login
// @desc     Sign up or login with google
// @access   Private
// @return   token
router.post('/google-login', authController.googleSignUpOrLogin);

// @route    GET /auth/facebook-login
// @desc     Sign up or login with facebook
// @access   Private
// @return   token
router.post('/facebook-login', authController.facebookSignUpOrLogin);

module.exports = router;
