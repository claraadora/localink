const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const config = require('config');

const Business = require('../../../models/Business');
const User = require('../../../models/User');
const { deleteOne } = require('../../../models/Business');

const businessId = new ObjectID();
const firstUserOwnerId = new ObjectID();
const userOwnerId = new ObjectID();
const userStaffId = new ObjectID();

const business = {
  _id: businessId,
  shopName: 'test business first owner, user owner, user staff'
};

//User who first registers the business
const firstUserOwner = {
  _id: firstUserOwnerId,
  name: 'test first business owner',
  email: 'testBO@yahoo.com',
  password: 'testBO@yahoo.com',
  role: 'owner',
  activated: true
};

//Added by business owner
const userOwner = {
  _id: userOwnerId,
  name: 'test user owner',
  email: 'testUO@yahoo.com',
  password: 'testUO@yahoo.com',
  role: 'owner',
  activated: true
};

const userStaff = {
  _id: userStaffId,
  name: 'test user staff',
  email: 'testUS@yahoo.com',
  password: 'testUS@yahoo.com',
  role: 'owner',
  activated: true
};

//Init token
const firstUserOwnerToken = createToken(businessId, firstUserOwnerId);
const userOwnerToken = createToken(businessId, userOwnerId);
const userStaffToken = createToken(business, userStaffId);

async function addDummyUsers() {
  await Business.findByIdAndDelete(businessId);
  await User.deleteMany({
    _id: {
      $in: [firstUserOwnerId, userOwnerId, userStaffId]
    }
  });
  try {
    const businessObj = await new Business(business).save();
    const firstUserOwnerObj = await new User(firstUserOwner).save();
    const userOwnerObj = await new User(userOwner).save();
    const userStaffObj = await new User(userStaff).save();
    businessObj.users.push(firstUserOwnerObj, userOwnerObj, userStaffObj);
    await businessObj.save();
  } catch (error) {
    console.log(error.message);
  }
}

// function addDummyUsers(done) {
//   console.log(firstUserOwnerId, userOwnerId, userStaffId);
//   console.log('bo');
//   console.log(businessObj);
//   if (businessObj) {
//     businessObj.users.filter(user => {
//       console.log('user in filter');
//       console.log(user._id);
//       console.log(firstUserOwnerId, userOwnerId, userStaffId);
//       return (
//         user._id !== firstUserOwnerId &&
//         user._id !== userOwnerId &&
//         user._id !== userStaffId
//       );
//     });
//   }
//   console.log(businessObj);
//   //   if (businessObj) {
//   //     Business.findByIdAndDelete(businessId);
//   //   }
//   User.deleteMany({
//     _id: {
//       $in: [firstUserOwnerId, userOwnerId, userStaffId]
//     }
//   })
//     .then(() => {
//       businessObj = new Business(business).save();
//       firstUserOwnerObj = new User(firstUserOwner).save();
//       userOwnerObj = new User(userOwner).save();
//       userStaffObj = new User(userStaff).save();
//       Promise.all([
//         businessObj,
//         firstUserOwnerObj,
//         userOwnerObj,
//         userStaffObj
//       ]).then(arr => {
//         arr[0].users.push(arr[1], arr[2], arr[3]);
//         businessObj = arr[0];
//         firstUserOwnerObj = arr[1];
//         userOwnerObj = arr[2];
//         userStaffObj = arr[3];
//       });
//     })
//     .then(() => done());
// }

function createToken(businessId, userId) {
  const payload = {
    business: {
      id: businessId,
      user_id: userId
    }
  };
  return jwt.sign(payload, config.get('jwtSecret')).toString();
}

module.exports = {
  business,
  firstUserOwner,
  userOwner,
  userStaff,
  firstUserOwnerToken,
  userOwnerToken,
  userStaffToken,
  addDummyUsers
};
