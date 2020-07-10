const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const {
  dummyShopper,
  shopperToken,
  addDummyShopper,
  removeDummyShopper,
  compareToken
} = require('./seed/seed');

//Configure chai
chai.use(chaiHTTP);

const app = require('../../server');

describe('authControllerShopper', () => {
  //Test to get user by token
  beforeEach(addDummyShopper);
  afterEach(removeDummyShopper);
  describe('Get shopper from token', () => {
    it('Given shopper token should return shopper object', done => {
      chai
        .request(app)
        .get('/auth')
        .set('x-auth-token', shopperToken)
        .end(function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          assert.equal(
            res.body._id,
            dummyShopper._id,
            'return shopper object incorrect'
          );
          done();
        });
    });

    //Test to login
    describe('Login shopper', () => {
      it('Given valid shopper login credentials should return token', done => {
        const loginCredentials = {
          email: dummyShopper.email,
          password: dummyShopper.password
        };
        chai
          .request(app)
          .post('/auth')
          .set('Content-Type', 'application/json')
          .send(loginCredentials)
          .end(function (error, res) {
            assert.equal(error, null, 'error is not null');
            assert.equal(res.status, 200), 'status is not 200';
            const result = compareToken(res.body.token, shopperToken);
            assert.equal(result, true, result.message);
            done();
          });
      });
    });
  });
});
