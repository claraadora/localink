const {
  business,
  firstUserOwner,
  userOwner,
  userStaff,
  hashPassword
} = require('./seed');

const {
  getPasswordResetURL,
  usePasswordHashToMakeToken
} = require('../../../controllers/email/email.controller');

const password = { password: userOwner.password };

async function addBusiness() {
  const businessObj = await new Business(business);
  const firstUserOwnerObj = await new User(firstUserOwner).save();
  firstUserOwnerObj.isAccountActive = true;
  firstUserOwnerObj.password = await hashPassword(firstUserOwnerObj.password);
  await firstUserOwnerObj.save();

  businessObj.users.push(firstUserOwnerObj);
  await businessObj.save();
}

async function addUserOwner() {
  const userOwnerObj = await new User(userOwner).save();
  userOwnerObj.isAccountActive = true;
  userOwnerObj.password = await hashPassword(userOwnerObj.password);
  await userOwnerObj.save();

  const businessObj = await Business.findById(business._id);
  businessObj.users.push(userOwnerObj);
  await businessObj.save();
}

async function removeUpdatedUser() {
  await User.findOneAndDelete({ name: updatedUser.name });
}

const updatedUser = {
  name: 'updated user owner name',
  role: 'updated role'
};

const deactivatedStaff = { ...userStaff };
deactivatedStaff.activated = false;

async function addDeactivatedStaff() {
  const deactivatedStaffObj = await new User(deactivatedStaff).save();
  deactivatedStaffObj.isAccountActive = true;
  deactivatedStaffObj.password = await hashPassword(
    deactivatedStaffObj.password
  );
  await deactivatedStaffObj.save();

  const businessObj = await Business.findById(business._id);
  businessObj.users.push(deactivatedStaffObj);
  await businessObj.save();
}

async function registerAddedUser() {
  const { role, name, email } = userOwner;

  try {
    const businessObj = await Business.findById(business._id);
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User with that email already exists' }] });
    }

    user = new User({
      name,
      email,
      role,
      activated: true
    });

    user.isAccountActive = true;

    await user.save();

    businessObj.users.push(user);

    await businessObj.save();

    const token = usePasswordHashToMakeToken(businessObj, user);
    const url = getPasswordResetURL(false, user, token);
    const substring = url.substr(21);
    return substring;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  password,
  addBusiness,
  addUserOwner,
  updatedUser,
  removeUpdatedUser,
  addDeactivatedStaff,
  registerAddedUser
};
