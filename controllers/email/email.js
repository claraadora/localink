const nodemailer = require('nodemailer');
const e = require('express');

const transported = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.SENDER_EMAIL_LOGIN_USER,
    pass: process.env.SENDER_EMAIL_PASSWORD
  }
});

const getPasswordResetURL = (isShopper, user, token) => {
  if (isShopper) {
    return 'http://localhost:3000/reset_password/' + token + '/' + user._id;
  } else {
    return (
      'http://localhost:3000/business/reset_password/' + token + '/' + user._id
    );
  }
};

const resetPasswordTemplate = (user, businessUser, url) => {
  const from = 'Localink' + '<' + process.env.SENDER_EMAIL_LOGIN + '>';
  const to = user.email;
  //For testing
  //const to = process.env.RECEIVER_EMAIL_LOGIN;
  const subject = 'Localink Password Reset';
  let recipient = null;
  if (user === businessUser) {
    recipient = user.name;
  } else {
    recipient = businessUser.name;
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

const uriEmailTemplate = (shopper, url) => {
  const from = 'Localink' + '<' + process.env.SENDER_EMAIL_LOGIN + '>';
  const to = shopper.email;
  // For testing
  //const to = process.env.RECEIVER_EMAIL_LOGIN;
  const subject = 'Localink Mobile Google Map GPS Navigation Link';
  const html = `
    <p>Hey ${shopper.name || shopper.email},</p>
    <p>Here is the Google Map GPS Navigation Link that you requested for:</p>
    <a href=${url}>${url}</a>
    <p>Have fun with the webpage!</p>
    <p>–Love, Localink</p>`;
  return { from, to, subject, html };
};

module.exports = {
  transported,
  getPasswordResetURL,
  resetPasswordTemplate,
  uriEmailTemplate
};
