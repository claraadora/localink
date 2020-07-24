const validateActivationToken = require('../email/validateActivationToken');

async function activateAccount(req, res) {
  const email = validateActivationToken(req, res);

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(403)
      .json({ errors: [{ msg: 'Invalid activation link' }] });
  }
  user.isAccountActive = true;
  await user.save();
  res.status(200).json({ msg: 'Activated account successfully' });
}

module.exports = { activateAccount };
