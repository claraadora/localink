const validateActivationToken = require('../email/validateActivationToken');

async function activateAccount(req, res) {
  const email = validateActivationToken(req, res);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).send('Invalid activation link');
  }
  user.isAccountActive = true;
  await user.save();
  res.status(200).send('Activated account successfully');
}

module.exports = { activateAccount };
