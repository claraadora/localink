module.exports = async function (req, res, next) {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    next();
  } else if (user && user.isAccountActive) {
    req.user = user;
    next();
  } else {
    res.send('Account not activated, click here to send email');
  }
};
