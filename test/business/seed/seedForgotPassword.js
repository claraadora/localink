const {
  usePasswordHashToMakeToken
} = require('../../../controllers/email/email.controller');
const { getPasswordResetURL } = require('../../../controllers/email/email');
const mongoose = require('mongoose');

const Business = require('../../../models/Business');
const User = require('../../../models/User');

const newPassword = { password: 'newBusinessPassword' };

async function getPasswordResetLinkInEmail(email) {
  let specificUser = null;
  let user = null;

  try {
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
  const url = getPasswordResetURL(false, specificUser, token);

  let substring = url.substr(45);
  substring = substring.replace('-', '_');
  return substring;
}

module.exports = { newPassword, getPasswordResetLinkInEmail };
