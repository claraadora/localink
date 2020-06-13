const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify business token
  try {
    jwt.verify(token, config.get('jwtSecret'), async (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        if (decoded.business) {
          const user_id = decoded.business.user_id;
          const user = await User.findById(user_id);
          if (user.activated) {
            req.user = decoded.business;
            req.userType = decoded;
            next();
          } else {
            res
              .status(403)
              .json({ msg: 'authorization denied, account not activated' });
          }
        } else if (decoded.shopper) {
          return res
            .status(401)
            .json({ msg: 'Passed a shopper token to a business account' });
        } else {
          return res.status(401).json({ msg: 'Token is not valid' });
        }
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
