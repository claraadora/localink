const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { sendActivationEmail } = require('../email/activationEmailController');

const Shopper = require('../../models/Shopper');

async function registerShopper(req, res) {
  const errors = validationResult(req); //converts errors into error object
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let shopper = await Shopper.findOne({ email });
    if (shopper && shopper.isAccountActive) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    shopper = new Shopper({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    shopper.password = await bcrypt.hash(password, salt);

    await shopper.save();

    sendActivationEmail(shopper, shopper, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

module.exports = { registerShopper };
