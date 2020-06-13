const nodemailer = require('nodemailer');

const transported = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.SENDER_EMAIL_LOGIN_USER,
    pass: process.env.SENDER_EMAIL_PASSWORD
  }
});

const getPasswordResetURL = (user, token) => {
  return 'http://localhost:5000/password/reset/' + user._id + '/' + token;
};

const resetPasswordTemplate = (user, businessUser, url) => {
  const from = 'Localink' + '<' + process.env.SENDER_EMAIL_LOGIN + '>';
  //const to = user.email;
  const to = process.env.RECEIVER_EMAIL_LOGIN;
  const subject = 'Localink Password Reset';
  let recipient = null;
  if (user === businessUser) {
    recipient = user.name;
  } else {
    recipient = user.shopName;
  }
  const html = `
    <p>Hey ${recipient || businessUser.email},</p>
    <p>We heard that you lost your Localink password. Sorry about that!</p>
    <p>But don’t worry! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>If you don’t use this link within 1 hour, it will expire.</p>
    <p>Have fun with the webpage!</p>
    <p>–Love, Localink</p>`;
  return { from, to, subject, html };
};

module.exports = { transported, getPasswordResetURL, resetPasswordTemplate };
