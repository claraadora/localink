const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  transported,
  getPasswordResetURL,
  resetPasswordTemplate
} = require('./email');

const Business = require('../../../models/Business');

const usePasswordHashToMakeToken = ({ password, _id, createdAt }) => {
  const secret = password + '-' + createdAt;
  const payload = {
    business: {
      id: _id
    }
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: 3600
  });
  return token;
};

const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.params;
  let business = null;
  try {
    business = await Business.findOne({ email });
  } catch (error) {
    res.status(404).json('No user with that email');
  }
  const token = usePasswordHashToMakeToken(business);
  const url = getPasswordResetURL(business, token);
  const emailTemplate = resetPasswordTemplate(business, url);

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
  const { userId, token } = req.params;
  const { password } = req.body;

  try {
    const business = await Business.findById(userId);
    if (!business) {
      res.status(404).json('No user with that id');
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(password, salt);
    await Business.findByIdAndUpdate(userId, { password: newPasswordHash });
    res.status(202).json('Password change successful');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { sendPasswordResetEmail, receivedNewPassword };
