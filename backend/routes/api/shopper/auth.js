const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authShopper = require('../../../middleware/authShopper');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const got = require('got');
const fetch = require('node-fetch');

const Shopper = require('../../../models/Shopper');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route    GET /auth
// @desc     Get user by token (load user for frontend)
// @access   Private
// @return   User
router.get('/', authShopper, async (req, res) => {
  try {
    const shopper = await Shopper.findById(req.user.id);
    res.json(shopper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let shopper = await Shopper.findOne({ email });

      if (!shopper) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, shopper.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        shopper: {
          id: shopper.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET /auth/google-login
// @desc     Sign up or login with google
// @access   Private
// @return   token
router.post('/google-login', async (req, res) => {
  const { tokenId } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const { email_verified, name, email } = response.payload;

    if (email_verified) {
      let shopper = await Shopper.findOne({ email });

      if (!shopper) {
        let password = email + process.env.GOOGLE_SECRET;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        shopper = new Shopper({
          name,
          email,
          password
        });

        await shopper.save();
      }

      const payload = {
        shopper: {
          id: shopper.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      console.log('error logging in with google');
      res.status(500).send('error logging in with google');
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET /auth/facebook-login
// @desc     Sign up or login with facebook
// @access   Private
// @return   token
router.post('/facebook-login', async (req, res) => {
  const { userID, accessToken } = req.body;

  const urlGraphFacebook =
    'https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${acessToken}';
  let response = await got(urlGraphFacebook);
  response = response.json();
  // fetch (urlGraphFacebook, {
  //   method: 'GET'
  // })
  // .then(response => response.json())
  // .then(response => {
  const { email, name } = response;
  try {
    let shopper = await Shopper.findOne({ email });
    if (!shopper) {
      let password = email + process.env.FACEBOOK_SECRET;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      shopper = new Shopper({
        name,
        email,
        password
      });

      await shopper.save();
    }

    const payload = {
      shopper: {
        id: shopper.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
