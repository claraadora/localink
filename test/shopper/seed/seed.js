const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Shopper = require('../../../models/Shopper');

const {
  getActivationLink
} = require('../../../controllers/email/activationEmailController');

const shopperId = new ObjectID();

const dummyShopper = {
  _id: shopperId,
  name: 'test shopper',
  email: 'testshopper@yahoo.com',
  password: 'testshopper@yahoo.com'
};

const registerCredentials = {
  name: dummyShopper.name,
  email: dummyShopper.email,
  password: dummyShopper.password
};

const newEmail = {
  email: 'updatedtestshopper@yahoo.com'
};

const newPassword = {
  oldPassword: dummyShopper.password,
  newPassword: 'updatedtestshopper@yahoo.com'
};

async function addDummyShopper() {
  const shopper = await new Shopper(dummyShopper).save();
  shopper.isAccountActive = true;
  shopper.password = await hashPassword(shopper.password);
  await shopper.save();
}

const shopperToken = createToken();

async function removeDummyShopper() {
  await Shopper.findByIdAndDelete(shopperId);
}

async function removeAddedDummyShopper() {
  await Shopper.findOneAndDelete({ email: dummyShopper.email });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const pw = await bcrypt.hash(password, salt);
  return pw;
}

function createToken() {
  const payload = {
    shopper: {
      id: shopperId
    }
  };
  return jwt.sign(payload, config.get('jwtSecret')).toString();
}

function decodeToken(token) {
  let token_id = null;

  jwt.verify(token, config.get('jwtSecret'), async (error, decoded) => {
    if (error) {
      return { message: 'Invalid token' };
    } else {
      if (decoded.shopper) {
        token_id = decoded.shopper.id;
      } else {
        return { message: 'Not a shopper token' };
      }
    }
  });
  return {
    token_id
  };
}

function compareToken(token1, token2) {
  try {
    const decoded1 = decodeToken(token1);
    const decoded2 = decodeToken(token2);
    if (decoded1.message) {
      return decoded1;
    } else if (decoded2.message) {
      return decoded2;
    } else {
      const token1_id = decoded1.token_id;
      const token2_id = decoded2.token_id;
      // console.log(
      //   token1_id +
      //     '  ' +
      //     token2_id
      // );
      if (token1_id == token2_id) {
        return true;
      } else {
        return { message: 'Token payload does not match' };
      }
    }
  } catch (error) {
    return { message: 'Something wrong with compareToken function in seed.js' };
  }
}

async function registerShopper() {
  const { name, email, password } = registerCredentials;

  const salt = await bcrypt.genSalt(10);

  const pw = await bcrypt.hash(password, salt);

  const shopper = new Shopper({
    name,
    email,
    password: pw
  });

  await shopper.save();

  const substring = getActivationLink(shopper).substr(21);
  return substring;
}

async function getShopperFromToken(token) {
  const decoded = decodeToken(token);
  const shopper = await Shopper.findById(decoded.token_id);
  return shopper;
}

module.exports = {
  dummyShopper,
  shopperToken,
  registerCredentials,
  newEmail,
  newPassword,
  addDummyShopper,
  removeDummyShopper,
  removeAddedDummyShopper,
  registerShopper,
  compareToken,
  getShopperFromToken
};
