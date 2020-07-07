module.exports = async function (req, res, next) {
  const email = req.body.email;
  const shopper = await Shopper.findOne({ email });
  if (!shopper) {
    next();
  } else if (shopper && shopper.isAccountActive) {
    req.user = shopper;
    next();
  } else {
    res.send('Account not activated, click here to send email');
  }
};
