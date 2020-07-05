const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const Shopper = require('../../models/Shopper');

async function updateEmail(req, res) {
  const errors = validationResult(req); //converts errors into error object
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  try {
    let shopper = await Shopper.findOne({ _id: req.user.id });

    if (!shopper) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    shopper.email = email;
    await shopper.save();
    res.status(200).json(shopper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function updatePassword(req, res) {
  const errors = validationResult(req); //converts errors into error object
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    let shopper = await Shopper.findOne({ _id: req.user.id });

    if (!shopper) {
      console.log('here');
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(oldPassword, shopper.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);

    shopper.password = await bcrypt.hash(newPassword, salt);

    await shopper.save();

    const payload = {
      shopper: {
        id: shopper.id
      }
    };

    //Create token
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

module.exports = { updateEmail, updatePassword };
