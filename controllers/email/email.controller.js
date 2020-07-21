const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  transported,
  getPasswordResetURL,
  resetPasswordTemplate
} = require('./email');

const mongoose = require('mongoose');
const Business = require('../../models/Business');
const User = require('../../models/User');
const Shopper = require('../../models/Shopper');

const usePasswordHashToMakeToken = (user, specificUser) => {
  let password = null;
  let payload = null;
  if (user === specificUser) {
    password = user.password;
    payload = {
      shopper: {
        id: user.id
      }
    };
  } else {
    password = specificUser.password;
    payload = {
      business: {
        id: user.id,
        user_id: specificUser.id
      }
    };
  }
  const secret = password + '-' + user.createdAt;

  const token = jwt.sign(payload, secret, {
    expiresIn: 3600
  });
  return token;
};

const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.params;
  let user = null;
  let specificUser = null;
  let isShopper = null;

  try {
    if (req.userType.shopper) {
      isShopper = true;
      const shopper = await Shopper.findOne({ email });

      if (!shopper) {
        res.status(401).json({ msg: 'Cannot find user with that email' });
      }
      user = shopper;
      specificUser = shopper;
    } else if (req.userType.business) {
      isShopper = false;
      specificUser = await User.findOne({ email });

      if (!specificUser) {
        res.status(401).json({ msg: 'Cannot find user with that email' });
      }

      user = await Business.findOne({
        users: mongoose.Types.ObjectId(specificUser.id)
      });
    } else {
      res.status(401).json('Token not valid');
    }
  } catch (error) {
    console.log('no user w that email');
    res.status(404).json('No user with that email');
  }
  const token = usePasswordHashToMakeToken(user, specificUser);
  const url = getPasswordResetURL(isShopper, specificUser, token);
  const emailTemplate = resetPasswordTemplate(user, specificUser, url);

  const sendEmail = () => {
    transported.sendMail(emailTemplate, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json('Error sending email');
      } else {
        //console.log(`**Email sent**`, info.response);
        res.status(250).json('Email sent successfully');
      }
    });
  };
  sendEmail();
};

const receivedNewPassword = async (req, res) => {
  const { user_id, token } = req.params;
  const { password } = req.body;

  let specificUser = null;
  let user = null;
  let collection = null;

  try {
    specificUser = await User.findById(user_id);

    if (!specificUser) {
      const shopper = await Shopper.findById(user_id);

      if (!shopper) {
        res.status(401).json({ msg: 'Cannot find user with that email' });
      } else {
        user = shopper;
        specificUser = shopper;
        collection = Shopper;
      }
    } else {
      user = await Business.findOne({
        users: mongoose.Types.ObjectId(specificUser.id)
      });
      collection = User;
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(password, salt);
    await collection.findByIdAndUpdate(user_id, { password: newPasswordHash });
    res.status(202).send('Password change successful');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  sendPasswordResetEmail,
  receivedNewPassword,
  getPasswordResetURL,
  usePasswordHashToMakeToken
};
