const validateActivationToken = require('../email/validateActivationToken');

async function activateAccount(req, res) {
  const email = validateActivationToken(req, res);

  const shopper = await Shopper.findOne({ email });
  if (!shopper) {
    return res
      .status(403)
      .json({ errors: [{ msg: 'Invalid activation link' }] });
  }
  shopper.isAccountActive = true;
  await shopper.save();
  res.status(200).send('Activated account successfully');
}

module.exports = { activateAccount };
