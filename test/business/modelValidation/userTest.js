const chai = require('chai');
const chaiHTTP = require('chai-http');
var expect = chai.expect;

//Configure chai
chai.use(chaiHTTP);

const User = require('../../../models/User');

describe('test the user model', () => {
  it('user object should be invalid if name is empty', done => {
    const userFields = {
      email: 'email@yahoo.com',
      role: 'staff'
    };
    const user = new User(userFields);
    user.validate(function (err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('user object should be invalid if email is empty', done => {
    const userFields = {
      name: 'name',
      role: 'staff'
    };
    const user = new User(userFields);
    user.validate(function (err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('user object should be invalid if role is empty', done => {
    const userFields = {
      name: 'name',
      email: 'email@yahoo.com'
    };
    const user = new User(userFields);
    user.validate(function (err) {
      expect(err.errors.role).to.exist;
      done();
    });
  });
});
