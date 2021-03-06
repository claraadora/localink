const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');
const Business = require('../models/Business');
const Shopper = require('../models/Shopper');

module.exports = async function (req, res, next) {
  const { user_id, token } = req.params;
  console.log(user_id);
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  try {
    const businessUser = await User.findById(user_id);
    let user = null;
    let password = null;

    if (!businessUser) {
      const shopper = await Shopper.findById(user_id);

      if (!shopper) {
        res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
      } else {
        user = shopper;
        password = shopper.password;
      }
    } else {
      user = await Business.findOne({
        users: mongoose.Types.ObjectId(user_id)
      });
      password = businessUser.password;
    }

    const pw = password ? password : 'oldpw';
    const secret = pw + '-' + user.createdAt;
    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ errors: [{ msg: 'Link is not valid' }] });
      } else {
        if (decoded.business) {
          req.user = decoded.business;
        } else {
          req.user = decoded.shopper;
        }
        next();
      }
    });
  } catch (error) {
    console.error('something wrong with reset password auth middleware');
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
