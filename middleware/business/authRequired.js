module.exports = async function (req, res, next) {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    next();
  } else if (user && user.isAccountActive) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ errors: [{ msg: 'Account not activated' }] });
  }
};
