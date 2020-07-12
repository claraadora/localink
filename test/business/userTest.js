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
  removeAddedDummyUsers,
  compareToken
} = require('./seed/seed');

const {
  addBusiness,
  addUserOwner,
  removeUpdatedUser,
  addDeactivatedStaff,
  updatedUser
} = require('./seed/seedUser');

//Configure chai
chai.use(chaiHTTP);

const app = require('../../server');

describe('userControllerBusiness', () => {
  //describe('test creating user...', () => {
  beforeEach(addBusiness);
  afterEach(removeAddedDummyUsers);

  it('Should create and save new user, role: owner', done => {
    chai
      .request(app)
      .post('/business/user')
      .set('x-auth-token', firstUserOwnerToken)
      .send(userOwner)
      .end(async (error, res) => {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200), 'status is not 200';
        const businessObj = await Business.findById(business._id);
        const addedUser = await User.findById(businessObj.users[1]);
        const dummyUserFields = {
          name: userOwner.name,
          email: userOwner.email,
          role: userOwner.role
        };
        expect(res => {
          expect(addedUser).to.include(dummyUserFields);
        });
        done();
      });
  });

  it('Should create and save new user, role: staff', done => {
    chai
      .request(app)
      .post('/business/user')
      .set('x-auth-token', firstUserOwnerToken)
      .send(userStaff)
      .end(async (error, res) => {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200), 'status is not 200';
        const businessObj = await Business.findById(business._id);
        const addedUser = await User.findById(businessObj.users[1]);
        const dummyUserFields = {
          name: userStaff.name,
          email: userStaff.email,
          role: userStaff.role
        };
        expect(res => {
          expect(addedUser).to.include(dummyUserFields);
        });
        done();
      });
    // });
  });
  //describe('test deleting user...', done => {
  it('Should delete user', done => {
    chai
      .request(app)
      .delete(`/business/user/${firstUserOwner._id}`)
      .set('x-auth-token', firstUserOwnerToken)
      .end(async (error, res) => {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const businessObj = await Business.findById(business._id);
        const numOfUsers = businessObj.users.length;
        assert.equal(numOfUsers, 0, 'number of users not 0');
        const user = await User.findById(firstUserOwner._id);
        assert.equal(user, null, 'user not deleted');
        done();
      });
  });

  describe('', () => {
    beforeEach(addUserOwner);
    afterEach(removeUpdatedUser);
    it('Should update user', done => {
      chai
        .request(app)
        .post(`/business/user/${userOwner._id}`)
        .set('x-auth-token', firstUserOwnerToken)
        .send(updatedUser)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          const user = await User.findById(userOwner._id);
          expect(res => {
            expect(user).to.include(updatedUser);
          });
          done();
        });
    });

    it('Should deactivate user', done => {
      chai
        .request(app)
        .get(`/business/user/${userOwner._id}`)
        .set('x-auth-token', firstUserOwnerToken)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          const user = await User.findById(userOwner._id);
          assert.equal(user.activated, false, 'User not deactivated');
          done();
        });
    });

    it('Should activate user', done => {
      addDeactivatedStaff();
      chai
        .request(app)
        .get(`/business/user/${userStaff._id}`)
        .set('x-auth-token', firstUserOwnerToken)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          const user = await User.findById(userStaff._id);
          assert.equal(user.activated, true, 'User not activated');
          done();
        });
    });
    //});
  });
});
