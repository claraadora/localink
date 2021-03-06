const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const getTransported = async () => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID, // ClientID
    process.env.GOOGLE_CLIENT_SECRET, // Client Secret
    'https://developers.google.com/oauthplayground' // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token:
      '1//04uv4zOaeJDkNCgYIARAAGAQSNwF-L9IrpLbKsJyh5n2oR9JirNmLl6DA7Yjj2Q1GbP6DVx-S6TfB2SeP54_oyuK-lp5QmBSAAJM'
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transported = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: process.env.EMAIL_SERVICE,
    service: 'gmail',
    port: process.env.PORT,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.SENDER_EMAIL_LOGIN,
      cliendId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token
      //pass: process.env.SENDER_EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  return transported;
};

const getPasswordResetURL = (isShopper, user, token) => {
  if (isShopper) {
    return (
      'https://pristine-big-bend-88828.herokuapp.com/reset-password/' +
      token +
      '/' +
      user._id
    );
  } else {
    return (
      'https://pristine-big-bend-88828.herokuapp.com/business/reset-password/' +
      token +
      '/' +
      user._id
    );
  }
};

const resetPasswordTemplate = (user, businessUser, url) => {
  const from = 'Localink' + '<' + process.env.SENDER_EMAIL_LOGIN + '>';
  //For testing
  //const to = process.env.RECEIVER_EMAIL_LOGIN;
  let to = null;
  const subject = 'Localink Password Reset';
  let recipient = null;
  if (user === businessUser) {
    to = user.email;
    recipient = user.name;
  } else {
    to = businessUser.email;
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
  return { from, to, subject, generateTextFromHTML: true, html };
};

const uriEmailTemplate = (shopper, url) => {
  const from = 'Localink' + '<' + process.env.SENDER_EMAIL_LOGIN + '>';
  // For testing
  //const to = process.env.RECEIVER_EMAIL_LOGIN;
  const to = shopper.email;
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
  //transported,
  getTransported,
  getPasswordResetURL,
  resetPasswordTemplate,
  uriEmailTemplate
};
