const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), async (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.business;

        if (!decoded.business && decoded.shopper) {
          return res
            .status(401)
            .json({ msg: 'Passed a shopper token to a business account' });
        }
        req.userType = decoded;
        const user_id = decoded.business.user_id;
        const user = await User.findById(user_id);
        const role = user.role;
        if (role == 'owner') {
          next();
        } else {
          res
            .status(403)
            .json({ msg: 'authorization denied, only owner has access' });
        }
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};