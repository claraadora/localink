const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const got = require('got');

const Shopper = require('../../models/Shopper');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function getUserByToken(req, res) {
  try {
    const shopper = await Shopper.findById(req.user.id);
    res.json(shopper);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let shopper = await Shopper.findOne({
      email: email,
      isAccountActive: true
    });

    if (!shopper) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, shopper.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
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
    res.status(500).json({ errors: [{ msg: 'Invalid credentials' }] });
  }
}

async function googleSignUpOrLogin(req, res) {
  const { tokenId } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const { email_verified, name, email } = response.payload;

    if (email_verified) {
      //const token = await loginOrSignUp(name, email, process.env.GOOGLE_SECRET);

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
      res
        .status(500)
        .json({ errors: [{ msg: 'error logging in with google' }] });
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
}

async function facebookSignUpOrLogin(req, res) {
  const { userID, accessToken } = req.body;

  const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  console.log(urlGraphFacebook);
  let response = await got(urlGraphFacebook);
  response = JSON.parse(response.body);
  console.log(response);

  const { email, name } = response;
  try {
    //const token = await loginOrSignUp(name, email, process.env.FACEBOOK_SECRET);
    //res.json({ token });

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

    await jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        console.log('sign ' + token);
        return token;
      }
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function loginOrSignUp(name, email, secret) {
  let shopper = await Shopper.findOne({ email });
  if (!shopper) {
    let password = email + secret;
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

  await jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: '5 days' },
    (err, token) => {
      if (err) throw err;
      console.log('sign ' + token);
      return token;
    }
  );
}

module.exports = {
  getUserByToken,
  login,
  googleSignUpOrLogin,
  facebookSignUpOrLogin
};
