const {
  business,
  firstUserOwner,
  userOwner,
  userStaff,
  hashPassword
} = require('./seed');

async function addBusiness() {
  const businessObj = await new Business(business).save();
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

module.exports = {
  addBusiness,
  addUserOwner,
  updatedUser,
  removeUpdatedUser,
  addDeactivatedStaff
};
