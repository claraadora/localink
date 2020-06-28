const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const expect = require('expect');
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
  getShopFromToken,
  clearDB
} = require('./seed/seed');
const {
  dummyProfile,
  updatedDummyProfile,
  addDummyProfileToFirstOwner,
  deleteDummyShopOfFirstOwner
} = require('./seed/seedProfile');

//Configure chai
chai.use(chaiHTTP);

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

// beforeEach(addDummyUsers);
// beforeEach(addDummyProfileToFirstOwner);
// afterEach(removeDummyUsers);
// afterEach(deleteDummyShopOfFirstOwner);

// describe('productControllerBusiness', () => {
//     it('Should create new product and return updated shop', done => {
//         chai
//         .request(app)
//         .set('x-auth-token', firstUserOwnerToken)
//         .
//     })
// })
