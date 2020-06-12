const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');
const Business = require('../models/Business');

module.exports = async function (req, res, next) {
  const { user_id, token } = req.params;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const user = await User.findById(user_id);
    const business = await Business.findOne({
      users: mongoose.Types.ObjectId(user_id)
    });
    const secret = user.password + '-' + business.createdAt;
    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
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
    res.status(500).json({ msg: 'Server Error' });
  }
};
