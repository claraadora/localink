const {
  usePasswordHashToMakeToken
} = require('../../../controllers/email/email.controller');
const { getPasswordResetURL } = require('../../../controllers/email/email');
const mongoose = require('mongoose');

const Shopper = require('../../../models/Shopper');

const newPassword = { password: 'newShopperPassword' };

async function getPasswordResetLinkInEmail(email) {
  let specificUser = null;
  let user = null;

  try {
    specificUser = await Shopper.findOne({ email });

    if (!specificUser) {
      console.log('Cannot find user with that email');
    }

    user = specificUser;
    console.log('b1 done');
  } catch (error) {
    console.log('No user with that email');
  }
  const token = usePasswordHashToMakeToken(user, specificUser);
  const url = getPasswordResetURL(true, specificUser, token);

  let substring = url.substr(45);
  substring = substring.replace('-', '_');
  console.log('b2');
  return substring;
}

module.exports = { newPassword, getPasswordResetLinkInEmail };
