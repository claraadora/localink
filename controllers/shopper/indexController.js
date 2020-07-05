const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const Shopper = require('../../models/Shopper');

async function registerShopper(req, res) {
  const errors = validationResult(req); //converts errors into error object
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let shopper = await Shopper.findOne({ email });
    if (shopper) {
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

module.exports = { registerShopper };
