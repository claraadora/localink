const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { sendActivationEmail } = require('../email/activationEmailController');

const Business = require('../../models/Business');
const User = require('../../models/User');

async function registerBusiness(req, res) {
  const errors = validationResult(req); //converts errors into error object
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { shopName, name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const business = new Business({
      shopName
    });

    const salt = await bcrypt.genSalt(10);

    const pw = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: pw,
      role: 'owner',
      activated: true
    });

    await user.save();

    business.users.push(user);

    await business.save();

    sendActivationEmail(business, user, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

module.exports = { registerBusiness };
