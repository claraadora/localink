const {
  usePasswordHashToMakeToken
} = require('../../../controllers/email/email.controller');
const { getPasswordResetURL } = require('../../../controllers/email/email');
const mongoose = require('mongoose');

const Business = require('../../../models/Business');
const User = require('../../../models/User');

const { business, userOwner } = require('./seed');

const newPassword = { password: userOwner.password };

async function getPasswordResetLinkInEmail(email) {
  let isShopper = null;
  let specificUser = null;
  let user = null;

  try {
    isShopper = false;
    specificUser = await User.findOne({ email });

    if (!specificUser) {
      console.log('Cannot find user with that email');
    }

    user = await Business.findOne({
      users: mongoose.Types.ObjectId(specificUser._id)
    });
  } catch (error) {
    console.log('No user with that email');
  }
  const token = usePasswordHashToMakeToken(user, specificUser);
  const url = getPasswordResetURL(isShopper, specificUser, token);

  const substring = url.substr(21);
  return substring;
}

module.exports = { newPassword, getPasswordResetLinkInEmail };
