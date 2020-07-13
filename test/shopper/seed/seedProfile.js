const { dummyShopper } = require('./seed');

const newEmail = {
  email: 'updatedtestshopper@yahoo.com'
};

const newPassword = {
  oldPassword: dummyShopper.password,
  newPassword: 'updatedtestshopper@yahoo.com'
};

module.exports = {
  newEmail,
  newPassword
};
