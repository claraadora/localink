const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  getPasswordResetURL,
  resetPasswordTemplate,
  uriEmailTemplate,
  getTransported
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
  const { isShopper } = req.body;
  let user = null;
  let specificUser = null;

  try {
    if (isShopper) {
      const shopper = await Shopper.findOne({ email });

      if (!shopper) {
        res
          .status(401)
          .json({ errors: [{ msg: 'Cannot find user with that email' }] });
      }
      user = shopper;
      specificUser = shopper;
    } else {
      specificUser = await User.findOne({ email });

      if (!specificUser) {
        res
          .status(401)
          .json({ errors: [{ msg: 'Cannot find user with that email' }] });
      }

      user = await Business.findOne({
        users: mongoose.Types.ObjectId(specificUser.id)
      });
    }
  } catch (error) {
    console.log('no user with that email');
    res.status(404).json({ errors: [{ msg: 'No user with that email' }] });
  }

  const token = usePasswordHashToMakeToken(user, specificUser);
  const url = getPasswordResetURL(isShopper, specificUser, token);
  const emailTemplate = resetPasswordTemplate(user, specificUser, url);

  const sendEmail = async () => {
    const transported = await getTransported();
    transported.sendMail(emailTemplate, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Error sending email' }] });
      } else {
        //console.log(`**Email sent**`, info.response);
        res.status(250).json('Email sent successfully');
      }
    });
  };
  sendEmail();
};

const sendURIEmail = async (req, res) => {
  const { uri } = req.body;
  const shopper = await Shopper.findById(req.user.id);
  const emailTemplate = uriEmailTemplate(shopper, uri);
  const transported = await getTransported();
  transported.sendMail(emailTemplate, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: 'Error sending email' }] });
    } else {
      //console.log(`**Email sent**`, info.response);
      res.status(250).json('Email sent successfully');
    }
  });
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
  usePasswordHashToMakeToken,
  sendURIEmail
};
