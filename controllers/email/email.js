const nodemailer = require('nodemailer');
const express = require('express');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID, // ClientID
  process.env.GOOGLE_CLIENT_SECRET, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();

const transported = nodemailer.createTransport({
  //host: 'smtp.gmail.com',
  service: process.env.EMAIL_SERVICE,
  // port: process.env.PORT,
  // secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.SENDER_EMAIL_LOGIN,
    cliendId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken:
      'ya29.a0AfH6SMBTXtZaePI5ENm94Ll2eoVy_NKaomCWaK5Lzj6EOD33RnTXbuEumESwyP2V6vY-pZLyxCm2mCayvhIv2lPz9KVZRjRcWmIoo1FX1DtT4ndukIlNYHBPRQDqKiCTNpZEDUnytdNOGz6XhOLuVUlT8PyFBtUcBOM'
    // pass: process.env.SENDER_EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const getPasswordResetURL = (isShopper, user, token) => {
  if (isShopper) {
    return 'http://localhost:3000/reset-password/' + token + '/' + user._id;
  } else {
    return (
      'http://localhost:3000/business/reset-password/' + token + '/' + user._id
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
  return { from, to, subject, html };
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
  transported,
  getPasswordResetURL,
  resetPasswordTemplate,
  uriEmailTemplate
};
