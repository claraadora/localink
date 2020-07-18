const { validationResult } = require('express-validator');

const Business = require('../../models/Business');
const User = require('../../models/User');
const {
  sendActivationEmailUser
} = require('../email/activationEmailController');
const {
  getPasswordResetURL,
  usePasswordHashToMakeToken
} = require('../email/email.controller');

async function addUserToBusiness(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { role, name, email } = req.body;

  try {
    const business = await Business.findById(req.user.id);
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User with that email already exists' }] });
    }

    user = new User({
      name,
      email,
      role,
      activated: true
    });

    user.isAccountActive = true;

    await user.save();

    business.users.push(user);

    await business.save();

    const token = usePasswordHashToMakeToken(business, user);
    const url = getPasswordResetURL(false, user, token);
    sendActivationEmailUser(business, user, url, res);

    res.status(200).json('Added user and sent email successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function deleteUser(req, res) {
  try {
    const business = await Business.findById(req.user.id);
    const newUsersArr = business.users.filter(
      user => user.toString() !== req.params.user_id
    );
    business.users = newUsersArr;
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
    await user.save();
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
