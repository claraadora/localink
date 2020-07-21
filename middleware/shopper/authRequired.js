module.exports = async function (req, res, next) {
  const email = req.body.email;
  const shopper = await Shopper.findOne({ email });
  if (!shopper) {
    next();
  } else if (shopper && shopper.isAccountActive) {
    req.user = shopper;
    next();
  } else {
    res.status(400).json({
      errors: [{ msg: 'Account not activated' }]
    });
  }
};
