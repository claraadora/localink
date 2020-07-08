const CryptoJS = require('crypto-js');

module.exports = validateActivationToken = (req, res) => {
  const token = decodeURIComponent(req.params.activationToken);
  let bytes = null;
  try {
    bytes = CryptoJS.AES.decrypt(token, process.env.ACTIVATION_CODE);
  } catch (error) {
    console.log(error);
    return res.status(403).send('Error decrypting activation token');
  }
  if (!bytes) {
    return res.status(403).send('Error decrypting activation token');
  }
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const { email, activeExpires } = decryptedData;

  if (activeExpires < Date.now()) {
    return res.status(403).send('Activation link has expired');
  }
  return email;
};
