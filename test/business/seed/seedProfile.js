const { ObjectID } = require('mongodb');
const profileId = new ObjectID();
const { business, firstUserOwner, userStaff } = require('./seed');
const Business = require('../../../models/Business');
const Shop = require('../../../models/Shop');
const geocode = require('../../../routes/api/distance/geocode');

const dummyProfile = {
  _id: profileId,
  owner: business._id,
  shopName: 'test create or update profile',
  avatar:
    'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg',
  description: 'testing profile is in db after creating or updating',
  address: '26 Bedok Road',
  promotions: 'current promotions',
  openingHours: '24hours/7',
  contactDetails: '+65 85720931',
  delivery: 'Free above $200, otherwise $20 islandwide delivery'
};

const updatedDummyProfile = {
  owner: business._id,
  shopName: 'updated test create or update profile',
  avatar:
    'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg',
  description: 'updated testing profile is in db after creating or updating',
  address: '26 Bedok Road',
  promotions: 'updated current promotions',
  openingHours: 'updated 24hours/7',
  contactDetails: '+updated 65 85720931',
  delivery: 'updated Free above $200, otherwise $20 islandwide delivery'
};

const newEmail = {
  email: 'testbusinessOwner@yahoo.com'
};

const newPassword = {
  oldPassword: firstUserOwner.email,
  newPassword: 'testbusinessOwner@yahoo.com'
};

const newStaffPassword = {
  oldPassword: userStaff.email,
  newPassword: 'testUserStaff@yahoo.com'
};

async function addDummyProfileToBusiness() {
  try {
    const profileFields = {
      shopName: dummyProfile.shopName
    };
    const profile = await Business.findOneAndUpdate(
      { _id: business._id },
      { $set: profileFields },
      { new: true, upsert: true }
    );

    const coordinates = await geocode(dummyProfile.address);
    const latLng = {
      lat: coordinates.lat,
      lng: coordinates.lng
    };

    const shopFields = { ...dummyProfile, owner: profile.id, latLng };
    const shop = new Shop(shopFields);
    await shop.save();
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteDummyShopOfBusiness() {
  await Shop.findByIdAndDelete(profileId);
  await Shop.findOneAndDelete({ shopName: updatedDummyProfile.shopName }); //remove added profile using route controller
}

module.exports = {
  dummyProfile,
  updatedDummyProfile,
  profileId,
  newEmail,
  newPassword,
  newStaffPassword,
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness
};
