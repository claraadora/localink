const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  transported,
  getPasswordResetURL,
  resetPasswordTemplate
} = require('./email');

const mongoose = require('mongoose');
const Business = require('../../../models/Business');
const User = require('../../../models/User');

const usePasswordHashToMakeToken = (business, user) => {
  const secret = user.password + '-' + business.createdAt;
  const payload = {
    business: {
      id: business.id,
      user_id: user.id
    }
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: 3600
  });
  return token;
};

const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.params;
  let user = null;
  let business = null;
  try {
    user = await User.findOne({ email });
    business = await Business.findOne({
      users: mongoose.Types.ObjectId(user.id)
    });
  } catch (error) {
    res.status(404).json('No user with that email');
  }
  const token = usePasswordHashToMakeToken(business, user);
  const url = getPasswordResetURL(user, token);
  const emailTemplate = resetPasswordTemplate(business, user, url);

  const sendEmail = () => {
    transported.sendMail(emailTemplate, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json('Error sending email');
      } else {
        //   console.log(info);
        console.log(`**Email sent**`, info.response);
        res.status(250).json('Email sent successfully');
      }
    });
  };
  sendEmail();
};

const receivedNewPassword = async (req, res) => {
  const { user_id, token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      res.status(404).json('No user with that id');
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(user_id, { password: newPasswordHash });
    res.status(202).json('Password change successful');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { sendPasswordResetEmail, receivedNewPassword };
