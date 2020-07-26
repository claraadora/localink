const cryptoRandomString = require('crypto-random-string');
const CryptoJS = require('crypto-js');
const { transported } = require('./email');

const getActivationLink = user => {
  const randomActivationCode = cryptoRandomString({ length: 10 });
  const activeExpires = Date.now() + 24 * 3600 * 1000;
  const data = {
    randomActivationCode,
    activeExpires,
    email: user.email
  };
  const activationCode = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.ACTIVATION_CODE
  ).toString();
  let uri = 'account-activation/' + encodeURIComponent(activationCode);
  if (user.role) {
    uri = 'business/' + uri;
  }
  return `http://localhost:5000/${uri}`;
};

const emailActivationTemplateUser = (user, specificUser, url) => {
  const from = 'Localink' + '<' + process.env.SENDER_EMAIL_LOGIN + '>';
  //For testing
  //const to = process.env.RECEIVER_EMAIL_LOGIN;
  const to = specificUser.email;
  const subject = 'Localink Account Activation';
  let recipient = specificUser.name;
  const html = `
      <p>Hey ${recipient || specificUser.email},</p>
      <p>You have been added as a user ${specificUser.role} to ${
    user.shopName
  } <p>
      <p>Here are your registered credentials: <p>
      <p>Name: ${specificUser.name}<p>
      <p>Role: ${specificUser.role}<p>
      <p>Click here to set a password for your localink account:</p>
      <a href=${url}>${url}</a>
      <p>If you don’t use this link within 24 hours, it will expire.</p>
      <p>Have fun with the webpage!</p>
      <p>–Love, Localink</p>`;
  return { from, to, subject, html };
};

const emailActivationTemplate = (user, specificUser, url) => {
  const from = 'Localink' + '<' + process.env.SENDER_EMAIL_LOGIN + '>';
  //For testing
  //const to = process.env.RECEIVER_EMAIL_LOGIN;
  let to = null;
  const subject = 'Localink Account Activation';
  let recipient = null;
  if (user === specificUser) {
    to = user.email;
    recipient = user.name;
  } else {
    to = user.users[0].email;
    recipient = user.shopName;
  }
  const html = `
      <p>Hey ${recipient || specificUser.email},</p>
      <p>Click here to activate your localink account:</p>
      <a href=${url}>${url}</a>
      <p>If you don’t use this link within 24 hours, it will expire.</p>
      <p>Have fun with the webpage!</p>
      <p>–Love, Localink</p>`;
  return { from, to, subject, html };
};

const sendEmail = (res, emailTemplate) => {
  transported.sendMail(emailTemplate, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: 'Error sending email' }] });
    } else {
      res.status(250).json('Email sent successfully');
    }
  });
};

const sendActivationEmail = (user, specificUser, res) => {
  const activationLink = getActivationLink(specificUser);
  const emailTemplate = emailActivationTemplate(
    user,
    specificUser,
    activationLink
  );
  sendEmail(res, emailTemplate);
};

const sendActivationEmailUser = (user, specificUser, url, res) => {
  const emailTemplate = emailActivationTemplateUser(user, specificUser, url);
  sendEmail(res, emailTemplate);
};

module.exports = {
  getActivationLink,
  sendActivationEmail,
  sendActivationEmailUser
};
