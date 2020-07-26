const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const expect = require('expect');

//Configure chai
chai.use(chaiHTTP);

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

const {
  setCurrentLocation,
  customStartLocation
} = require('./seed/seedStartLocation');

const {
  dummyShopper,
  addDummyShopper,
  removeDummyShopper
} = require('./seed/seed');

const { addDummyUsers, removeDummyUsers } = require('../business/seed/seed');

const getCurrentLocation = require('../../routes/api/distance/geolocation');
const geocode = require('../../routes/api/distance/geocode');
const getDistance = require('../../routes/api/distance/distance');

const {
  profileId,
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness
} = require('../business/seed/seedProfile');

describe("test setting shopper's start location", () => {
  beforeEach(addDummyShopper);
  afterEach(removeDummyShopper);

  beforeEach(addDummyUsers);
  beforeEach(addDummyProfileToBusiness);
  afterEach(deleteDummyShopOfBusiness);
  afterEach(removeDummyUsers);
  it('should get current location and set distance to shop', done => {
    chai
      .request(app)
      .post(`/start-location/${dummyShopper._id}`)
      .set('Content-Type', 'application/json')
      .send(setCurrentLocation)
      .end(async (error, res) => {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const currLocation = await getCurrentLocation();
        expect(res => {
          expect(res.body).to.eql(currLocation);
        });
        const shop = await Shop.findById(profileId);
        const latLng = await geocode(shop.address);
        const dist = await getDistance(res.body, latLng);
        const saved = await shop.distance.filter(obj => {
          return obj && obj[dummyShopper._id];
        })[0][dummyShopper._id];
        assert.equal(dist, saved);
        done();
      });
  });

  it('should get input location and set distance to shop', done => {
    chai
      .request(app)
      .post(`/start-location/${dummyShopper._id}`)
      .set('Content-Type', 'application/json')
      .send(customStartLocation)
      .end(async (error, res) => {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const currLocation = await getCurrentLocation();
        expect(res => {
          expect(res.body).to.eql(currLocation);
        });
        const shop = await Shop.findById(profileId);
        const latLng = await geocode(shop.address);
        const dist = await getDistance(res.body, latLng);
        const saved = await shop.distance.filter(obj => {
          return obj && obj[dummyShopper._id];
        })[0][dummyShopper._id];
        assert.equal(dist, saved);
        done();
      });
  });
});
