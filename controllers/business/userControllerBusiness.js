const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const Business = require('../../models/Business');
const User = require('../../models/User');

async function addUserToBusiness(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { role, name, email, password } = req.body;

  try {
    const business = await Business.findById(req.user.id);

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User with that email already exists' }] });
    }

    const salt = await bcrypt.genSalt(10);

    const pw = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: pw,
      role,
      activated: true
    });

    await user.save();

    business.users.push(user);

    await business.save();

    res.status(200).json('Added user successfully');
    // const payload = {
    //   business: {
    //     id: business.id,
    //     user_id: user.id
    //   }
    // };

    // //Create token
    // jwt.sign(
    //   payload,
    //   config.get('jwtSecret'),
    //   { expiresIn: '5 days' },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function deleteUser(req, res) {
  try {
    const business = await Business.findById(req.user.id);

    business.users.filter(user => {
      return user.toString() != req.params.user_id;
    });
    business.save();

    await User.findByIdAndDelete(req.params.user_id);

    res.status(200).json('Deactivated user successfully');
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
}

async function editUser(req, res) {
  try {
    const { role, name } = req.body;
    const userFields = {
      role,
      name
    };
    const user = await User.findOneAndUpdate(
      { _id: req.params.user_id },
      { $set: userFields },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

async function activateOrDeactivateUser(req, res) {
  try {
    const user = await User.findById(req.params.user_id);
    user.activated = !user.activated;
    user.save();
    res.status(200).json('successfully changed user activation status');
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  addUserToBusiness,
  deleteUser,
  editUser,
  activateOrDeactivateUser
};
