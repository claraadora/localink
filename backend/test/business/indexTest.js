const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const {
  business,
  firstUserOwner,
  userOwner,
  userStaff,
  firstUserOwnerToken,
  userOwnerToken,
  userStaffToken,
  addDummyUsers,
  removeDummyUsers,
  compareToken,
  getBusinessFromToken,
  clearDB
} = require('./seed/seed');

//Configure chai
chai.use(chaiHTTP);

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

let result = null;

describe('indexControllerBusiness', () => {
  afterEach(() => clearDB(result.businessId, result.userId));
  describe('Register business', () => {
    it('Should return token upon successful registration', done => {
      const registerCredentials = {
        shopName: business.shopName,
        name: firstUserOwner.name,
        email: firstUserOwner.email,
        password: firstUserOwner.password
      };
      chai
        .request(app)
        .post('/business')
        .set('Content-Type', 'application/json')
        .send(registerCredentials)
        .end(async function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          result = await getBusinessFromToken(res.body.token);
          assert.equal(
            result.shopName,
            registerCredentials.shopName,
            'Shop name is different'
          );
          assert.equal(
            result.name,
            registerCredentials.name,
            'Name is different'
          );
          assert.equal(
            result.email,
            registerCredentials.email,
            'Email is different'
          );
          done();
        });
    });
  });
});
