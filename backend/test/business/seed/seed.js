const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Business = require('../../../models/Business');
const User = require('../../../models/User');

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
const userStaffToken = createToken(businessId, userStaffId);

async function removeDummyUsers() {
  try {
    await Business.findByIdAndDelete(businessId);
    await User.deleteMany({
      _id: {
        $in: [firstUserOwnerId, userOwnerId, userStaffId]
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function addDummyUsers() {
  try {
    const businessObj = await new Business(business).save();
    const firstUserOwnerObj = await new User(firstUserOwner);
    firstUserOwnerObj.password = await hashPassword(firstUserOwnerObj.password);
    await firstUserOwnerObj.save();

    const userOwnerObj = await new User(userOwner);
    userOwnerObj.password = await hashPassword(userOwnerObj.password);
    await userOwnerObj.save();

    const userStaffObj = await new User(userStaff);
    userStaffObj.password = await hashPassword(userStaffObj.password);
    await userStaffObj.save();

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

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const pw = await bcrypt.hash(password, salt);
  return pw;
}

function decodeToken(token) {
  let token_id = null;
  let token_userId = null;

  jwt.verify(token, config.get('jwtSecret'), async (error, decoded) => {
    if (error) {
      return { message: 'Invalid token' };
    } else {
      if (decoded.business) {
        token_id = decoded.business.id;
        token_userId = decoded.business.user_id;
      } else {
        return { message: 'Not a business token' };
      }
    }
  });

  return {
    token_id,
    token_userId
  };
}

function compareToken(token1, token2) {
  try {
    const decoded1 = decodeToken(token1);
    const decoded2 = decodeToken(token2);
    if (decoded1.message) {
      return decoded1;
    } else if (decoded2.message) {
      return decoded2;
    } else {
      const token1_id = decoded1.token_id;
      const token1_userId = decoded1.token_userId;
      const token2_id = decoded2.token_id;
      const token2_userId = decoded2.token_userId;
      //   console.log(
      //     token1_id +
      //       '  ' +
      //       token2_id +
      //       '  ' +
      //       token1_userId +
      //       '  ' +
      //       token2_userId
      //   );
      if (token1_id == token2_id && token1_userId == token2_userId) {
        return true;
      } else {
        return { message: 'Token payload does not match' };
      }
    }
  } catch (error) {
    return { message: 'Something wrong with compareToken function in seed.js' };
  }
}

async function getBusinessFromToken(token) {
  const decoded = decodeToken(token);
  const business = await Business.findById(decoded.token_id);
  const user = await User.findById(decoded.token_userId);
  return {
    businessId: business.id,
    userId: user.id,
    shopName: business.shopName,
    email: user.email,
    name: user.name
  };
}

async function clearDB(businessId, userId) {
  await Business.findByIdAndDelete(businessId);
  await User.findByIdAndDelete(userId);
}

module.exports = {
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
};
